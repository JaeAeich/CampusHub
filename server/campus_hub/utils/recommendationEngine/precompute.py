import metaflow
import numpy as np
import pandas as pd
import requests
from scipy.sparse.linalg import svds
from scipy.sparse import csr_matrix

class PrecomputeRecommendationsFlow(metaflow.FlowSpec):
    @metaflow.step
    def start(self):
        self.next(self.prepare_data)

    @metaflow.step
    def prepare_data(self):
        # Fetch data from API
        reviews_response = self.retrieve_data_from_api('reviews')
        products_response = self.retrieve_data_from_api('products')
        user_ids = self.retrieve_data_from_api('users')
        print(user_ids['user_ids'])
        product_ids = [product['product_id'] for product in products_response['products']]

        # Create DataFrame with all combinations of users and products
        all_combinations = [(user_id, product_id) for user_id in user_ids['user_ids'] for product_id in product_ids]
        self.df_all = pd.DataFrame(all_combinations, columns=['userId', 'productId'])

        # Extract ratings from review data and merge with df_all
        reviews_data = []
        reviewsList = reviews_response['reviews']

        for entry in reviewsList:
            product_id = entry['product_id']
            reviews = entry['reviews']
            
            for review_item in reviews:
                user_id = review_item['user_id']
                rating = review_item['rating']
                
                reviews_data.append({
                    'userId': user_id,
                    'productId': product_id,
                    'ratings': rating
                })

        # Create DataFrame from extracted data
        self.df_reviews = pd.DataFrame(reviews_data)
        self.df_initial = pd.merge(self.df_all, self.df_reviews, on=['userId', 'productId'], how='left')
        self.df_initial['ratings'].fillna(0, inplace=True)
        self.data = self.df_initial

        # Perform data preprocessing
        self.counts = self.data['userId'].value_counts()
        self.data = self.data.groupby(['userId', 'productId']).mean().reset_index()
        self.data = self.data.pivot(index='userId', columns='productId', values='ratings').fillna(0)

        # Perform SVD on the sparse matrix
        self.data_sparse = csr_matrix(self.data.values)
        self.U, self.sigma, self.Vt = svds(self.data_sparse, k=2)
        self.sigma = np.diag(self.sigma)

        self.next(self.compute_recommendations)

    @metaflow.step
    def compute_recommendations(self):
        # Compute predicted ratings
        all_user_predicted_ratings = np.dot(np.dot(self.U, self.sigma), self.Vt)
        self.preds_df = pd.DataFrame(all_user_predicted_ratings, index=self.data.index, columns=self.data.columns)
        self.next(self.save_recommendations)

    @metaflow.step
    def save_recommendations(self):
        # Save precomputed recommendations to CSV
        self.preds_df.to_csv('precomputed_recommendations.csv')
        self.next(self.end)

    @metaflow.step
    def end(self):
        print("##################################################################")
        pass

    def retrieve_data_from_api(self, s):
        url = f'https://localhost:8081/campus_hub/v1/{s}'
        response = requests.get(url)
        response_content = response.json() if response.status_code == 200 else None
        return response_content

if __name__ == '__main__':
    PrecomputeRecommendationsFlow()
