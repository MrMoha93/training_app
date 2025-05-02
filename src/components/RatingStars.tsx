interface Props {
  value: number;
  onChange: (value: number) => void;
}

export default function RatingStars({ value, onChange }: Props) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="rating mt-6">
      {stars.map((star) => (
        <input
          key={star}
          type="radio"
          name="rating"
          className="mask mask-star-2 bg-orange-400"
          aria-label={`${star} star`}
          checked={value === star}
          onChange={() => onChange(star)}
        />
      ))}
    </div>
  );
}
