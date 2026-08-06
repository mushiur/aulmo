import clsx from "clsx";

export default function SectionEyebrow({
  label,
  grow = false,
  className,
}: {
  label: string;
  grow?: boolean;
  className?: string;
}) {
  return (
    <div className={clsx("flex items-center gap-3.5", className)}>
      <span className="font-mono-label text-[9.5px] tracking-[0.24em] opacity-50 whitespace-nowrap">
        {label}
      </span>
      <span className={clsx("h-px bg-current/20", grow ? "flex-1" : "w-[60px]")} />
    </div>
  );
}
