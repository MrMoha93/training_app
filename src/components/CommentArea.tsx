interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function CommentArea({ value, onChange }: Props) {
  return (
    <fieldset className="fieldset mt-1">
      <textarea
        className="textarea h-24"
        placeholder="Your comment..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      ></textarea>
    </fieldset>
  );
}
