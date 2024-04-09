import getReviews from '@/api/reviews/reviews';
import ReviewList from '@/api/reviews/types';
import { useEffect, useState } from 'react';
import Loading from './Loading';
import ReviewCard from './ReviewCard';

function Reviews(props: { store_id: string; product_id: string }) {
  const { store_id, product_id } = props;
  const [reviewsList, setReviewsList] = useState<ReviewList | null>(null);
  const [errorReviews, setErrorReviews] = useState(false);
  const [isLoadingReviews, setIsLoadingReviews] = useState(true);

  useEffect(() => {
    async function fetchReviews() {
      const response = await getReviews(store_id, product_id);
      if ('error' in response) {
        setErrorReviews(true);
        setIsLoadingReviews(false);
      } else if ('reviews' in response) {
        setReviewsList(response as unknown as ReviewList);
        setIsLoadingReviews(false);
      }
    }
    fetchReviews();
  }, [product_id, store_id]);

  if (isLoadingReviews) {
    return <Loading />;
  }

  if (errorReviews) {
    return <div className="mx-auto items-center my-auto">No Reviews found.</div>;
  }

  return (
    <div className="flex flex-col w-lg">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold mb-10">Reviews</h2>
      </div>
      <div className="flex flex-col">
        {reviewsList?.reviews.map((review) => <ReviewCard review={review} />)}
      </div>
    </div>
  );
}

export default Reviews;
