function Badge({
  fn,
  title,
  className,
}: {
  fn?: () => void;
  title?: string;
  className?: string;
}) {
  return (
    <button
      className={`rounded-xl  px-2 pt-[2px] text-sm tracking-tight text-white ${className}`}
      onClick={fn}
    >
      {title}
    </button>
  );
}

export default Badge;
