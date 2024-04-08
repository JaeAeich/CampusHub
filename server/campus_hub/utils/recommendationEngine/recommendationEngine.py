import metaflow
import pandas as pd


class GenerateRecommendationsFlow(metaflow.FlowSpec):
    @metaflow.step
    def start(self):
        self.user_id = "users_L4ciTXoXrL9ufsRTuX4Lc2"
        self.next(self.load_precomputed_recommendations)

    @metaflow.step
    def load_precomputed_recommendations(self):
        # Load precomputed recommendations from CSV
        self.preds_df = pd.read_csv(
            "precomputed_recommendations.csv", index_col="userId"
        )
        self.next(self.get_recommendations)

    @metaflow.step
    def get_recommendations(self):
        user_id = self.user_id  # Use the provided user ID
        num_recommendations = 5  # Number of recommendations to generate
        recommendations = (
            self.preds_df.loc[user_id]
            .sort_values(ascending=False)
            .head(num_recommendations)
        )
        print(recommendations)
        self.next(self.end)

    @metaflow.step
    def end(self):
        pass


if __name__ == "__main__":
    GenerateRecommendationsFlow()

# metadata = metaflow.get_metadata()
# run = metadata.run_flow(GenerateRecommendationsFlow)


# import metaflow
# import numpy as np
# import pandas as pd
# import requests
# from scipy.sparse.linalg import svds
# from scipy.sparse import csr_matrix
# from sklearn.model_selection import train_test_split
# from users import users

# class RecommendationFlow(metaflow.FlowSpec):
#     @metaflow.step
#     def start(self):
#         self.next(self.prepare_data)

#     @metaflow.step
#     def prepare_data(self):
#         # Fetch data from API
#         reviews_response = self.retrieve_data_from_api('reviews')
#         products_response = self.retrieve_data_from_api('products')

#         user_ids = users
#         product_ids = [product['product_id'] for product in products_response['products']]

#         # Create DataFrame with all combinations of users and products
#         all_combinations = [(user_id, product_id) for user_id in user_ids for product_id in product_ids]
#         self.df_all = pd.DataFrame(all_combinations, columns=['userId', 'productId'])

#         # Extract ratings from review data and merge with df_all
#         reviews_data = []
#         reviewsList=reviews_response['reviews'];

#         for entry in reviewsList:
#             product_id = entry['product_id']
#             reviews = entry['reviews']

#             for review_item in reviews:
#                 user_id = review_item['user_id']
#                 rating = review_item['rating']

#                 reviews_data.append({
#                     'userId': user_id,
#                     'productId': product_id,
#                     'ratings': rating
#                 })

#         # Create DataFrame from extracted data
#         self.df_reviews = pd.DataFrame(reviews_data)
#         self.df_initial = pd.merge(self.df_all, self.df_reviews, on=['userId', 'productId'], how='left')
#         self.df_initial['ratings'].fillna(0, inplace=True)
#         self.data=self.df_initial

#         # Perform data preprocessing
#         self.counts = self.data['userId'].value_counts()
#         self.data = self.data[self.data['userId'].isin(self.counts[self.counts >= 15].index)]
#         self.data = self.data.groupby(['userId', 'productId']).mean().reset_index()
#         self.data = self.data.pivot(index='userId', columns='productId', values='ratings').fillna(0)

#         # Split data into train and test sets
#         train_data, test_data = train_test_split(self.data, test_size=0.3, random_state=0)
#         self.data['user_index'] = np.arange(0, self.data.shape[0], 1)
#         self.data.set_index(['user_index'], inplace=True)
#         self.data_sparse = csr_matrix(self.data.values)

#         # Perform SVD on the sparse matrix
#         print(self.data_sparse.shape)
#         self.U, self.sigma, self.Vt = svds(self.data_sparse, k=2)
#         self.sigma = np.diag(self.sigma)

#         self.next(self.compute_recommendations)

#     @metaflow.step
#     def compute_recommendations(self):
#         # Compute predicted ratings
#         all_user_predicted_ratings = np.dot(np.dot(self.U, self.sigma), self.Vt)
#         print(all_user_predicted_ratings)
#         self.preds_df = pd.DataFrame(all_user_predicted_ratings, columns=self.data.columns)
#         self.next(self.end)

#     @metaflow.step
#     def end(self):
#         user_id = 1  # Example user ID, replace with actual user input
#         self.return_recommendations(user_id, self.data_sparse, self.preds_df, 5)

#     def retrieve_data_from_api(self, s):
#         url = f'https://campushub-server.onrender.com/campus_hub/v1/{s}'
#         response = requests.get(url)
#         response_content = response.json() if response.status_code == 200 else None
#         return response_content

#     def return_recommendations(self, user_id, pivot_df, preds_df, num_recommendations):
#         # Convert the sparse matrix to a DataFrame
#         pivot_df = pd.DataFrame(pivot_df.todense(), columns=preds_df.columns)

#         # Generate and display recommendations for the specified user ID
#         user_idx = user_id - 1
#         sorted_user_ratings = pivot_df.iloc[user_idx].sort_values(ascending=False)
#         sorted_user_predictions = preds_df.iloc[user_idx].sort_values(ascending=False)
#         temp = pd.concat([sorted_user_ratings, sorted_user_predictions], axis=1)
#         temp.index.name = 'Recommended Items'
#         temp.columns = ['user_ratings', 'user_predictions']
#         temp = temp.loc[temp.user_ratings == 0]
#         temp = temp.sort_values('user_predictions', ascending=False)
#         print('\nBelow are the recommended items for user (user_id = {}):\n'.format(user_id))
#         print(temp.head(num_recommendations))


# if __name__ == '__main__':
#     RecommendationFlow()
