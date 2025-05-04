import { Review } from "../types";
import { formatDistanceToNow } from "date-fns";
import { deleteReview } from "../services/reviewService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import RatingStars from "./RatingStars";
import authService from "../services/authService";

interface Props {
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
}

export default function ReviewList({ reviews, setReviews }: Props) {
  const currentUser = authService.getCurrentUser();

  if (reviews.length === 0) return null;

  async function handleDelete(reviewId: string) {
    await deleteReview(reviewId);
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
  }

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Reviews</h2>
      <ul className="space-y-2">
        {reviews.map((review) => (
          <li key={review.id} className="border-b pb-2">
            <div className="flex flex-col items-start gap-1">
              <div className="text-neutral text-xs font-semibold">
                {review.user?.name}
              </div>
              <div className="text-xs text-success">
                {formatDistanceToNow(new Date(review.createdAt), {
                  addSuffix: true,
                })}
              </div>
              <RatingStars value={review.rating} name={`review-${review.id}`} />
              {review.comment && (
                <div className="text-sm">{review.comment}</div>
              )}
              {currentUser &&
                (review.userId === currentUser.id || currentUser.isAdmin) && (
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="text-error text-sm mt-1 cursor-pointer ml-auto"
                  >
                    <FontAwesomeIcon icon={faTrashCan} />
                  </button>
                )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
