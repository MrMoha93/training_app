import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getExerciseInfo } from "../services/exerciseInfoService";
import { getReviews, postReview } from "../services/reviewService";
import { ExerciseInfo, Review } from "../types";
import RatingStars from "../components/RatingStars";
import CommentArea from "../components/CommentArea";
import ReviewList from "../components/ReviewList";

export default function ExerciseInfoPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [exerciseInfo, setExerciseInfo] = useState<ExerciseInfo>();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      if (!id) return;
      const { data } = await getExerciseInfo(id);
      if (!data) return navigate("/not-found");
      setExerciseInfo(data);

      const reviewsRes = await getReviews(id);
      setReviews(reviewsRes.data);
    }

    fetchData();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!id) return;

    if (rating < 1) {
      setError("Please select a rating before submitting");
      return;
    }
    setError("");

    await postReview(id, { rating, comment });
    setRating(0);
    setComment("");

    const updated = await getReviews(id);
    setReviews(updated.data);
  }

  if (!exerciseInfo) return <h1>Loading...</h1>;

  return (
    <div className="flex justify-center mt-10">
      <div className="card w-full max-w-md bg-base-200 shadow-xl p-6">
        <h1 className="text-3xl font-bold text-center mb-4">
          {exerciseInfo.name}
        </h1>
        {exerciseInfo.description && (
          <p className="text-left text-md mb-4">{exerciseInfo.description}</p>
        )}
        <form onSubmit={handleSubmit}>
          <RatingStars value={rating} onChange={setRating} />
          <CommentArea value={comment} onChange={setComment} />
          {error && <div className="text-error text-sm mt-1">{error}</div>}
          <button type="submit" className="btn btn-success mt-2">
            Submit
          </button>
        </form>
        <ReviewList reviews={reviews} />
      </div>
    </div>
  );
}
