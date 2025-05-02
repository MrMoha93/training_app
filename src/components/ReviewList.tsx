import { Review } from "../types";
import RatingStars from "./RatingStars";

interface Props {
  reviews: Review[];
}

export default function ReviewList({ reviews }: Props) {
  if (reviews.length === 0) return null;

  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-2">Reviews</h2>
      <ul className="space-y-2">
        {reviews.map((review) => (
          <li key={review.id} className="border-b border-black pb-2">
            <div className="flex flex-col items-start gap-1">
              <div className="text-xs text-primary">
                {new Date(review.createdAt).toLocaleDateString()}
              </div>
              <RatingStars value={review.rating} name={`review-${review.id}`} />
              {review.comment && (
                <div className="text-sm">{review.comment}</div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
