interface Props {
  value: number;
  onChange?: (value: number) => void;
  name?: string;
}

export default function RatingStars({ value, onChange, name }: Props) {
  const stars = [1, 2, 3, 4, 5];

  function WrapperClass(onChange?: (value: number) => void) {
    return `rating mt-2 ${!onChange ? "pointer-events-none" : ""}`;
  }

  return (
    <div className={WrapperClass(onChange)}>
      {stars.map((star) => (
        <input
          key={star}
          type="radio"
          name={name ?? "rating"}
          className="mask mask-star-2 bg-orange-400"
          aria-label={`${star} star`}
          checked={value === star}
          onChange={() => onChange?.(star)}
        />
      ))}
    </div>
  );
}
