import metaflow
import numpy as np
import pandas as pd
from scipy.sparse.linalg import svds
from scipy.sparse import csr_matrix
from sklearn.model_selection import train_test_split

class RecommendationFlow(metaflow.FlowSpec):
    @metaflow.step
    def start(self):
        # Fetch data from database using API calls
        columns=['userId', 'productId', 'ratings','timestamp']
        self.data = pd.read_csv("/home/aishika/CampusHub/server/recommendation-engine/Electronics.csv", names=columns, nrows=1000)
        self.data.drop('timestamp',axis=1,inplace=True)
        self.next(self.prepare_data)

    @metaflow.step
    def prepare_data(self):
        self.counts=self.data.userId.value_counts()
        self.data=self.data[self.data.userId.isin(self.counts[self.counts>=15].index)] 
        
        self.data = self.data.groupby(['userId', 'productId']).mean().reset_index()
        # Pivot data
        self.data = self.data.pivot(index='userId', columns='productId', values='ratings').fillna(0)

        train_data, test_data = train_test_split(self.data, test_size = 0.3, random_state=0)
        self.data['user_index'] = np.arange(0, self.data.shape[0], 1)
        self.data.set_index(['user_index'], inplace=True)
        self.data_sparse = csr_matrix(self.data.values)

         # Perform SVD on the sparse matrix
        self.U, self.sigma, self.Vt = svds(self.data_sparse, k=10)

        self.sigma = np.diag(self.sigma)
        self.next(self.compute_recommendations)

    @metaflow.step
    def compute_recommendations(self):
        # Compute predicted ratings
        all_user_predicted_ratings = np.dot(np.dot(self.U, self.sigma), self.Vt)
        self.preds_df = pd.DataFrame(all_user_predicted_ratings, columns=self.data.columns)
        self.next(self.end)

    @metaflow.step
    def end(self):
        # Present recommendations based on user input
        user_id = 1  # Example user ID, replace with actual user input
        num_recommendations = 5  # Number of recommendations to display
        self.return_recommendations(user_id, self.data_sparse, self.preds_df, num_recommendations)

    def retrieve_data_from_api(self):
        data = ...  # API call 
        return data

    def return_recommendations(self, user_id, pivot_df, preds_df, num_recommendations):
        # Convert the sparse matrix to a DataFrame
        pivot_df = pd.DataFrame(pivot_df.todense(), columns=preds_df.columns)
        
        # Generate and display recommendations for the specified user ID
        user_idx = user_id - 1
        sorted_user_ratings = pivot_df.iloc[user_idx].sort_values(ascending=False)
        sorted_user_predictions = preds_df.iloc[user_idx].sort_values(ascending=False)
        temp = pd.concat([sorted_user_ratings, sorted_user_predictions], axis=1)
        temp.index.name = 'Recommended Items'
        temp.columns = ['user_ratings', 'user_predictions']
        temp = temp.loc[temp.user_ratings == 0]
        temp = temp.sort_values('user_predictions', ascending=False)
        print('\nBelow are the recommended items for user (user_id = {}):\n'.format(user_id))
        print(temp.head(num_recommendations))


if __name__ == '__main__':
    RecommendationFlow()
