import type { ReactNode } from "react";
import Breadcrumb, { type BreadcrumbItem } from "@/components/ui/Breadcrumb";

export default function PageHeader({
  breadcrumb,
  eyebrow,
  title,
  intro,
  children,
}: {
  breadcrumb: BreadcrumbItem[];
  eyebrow: string;
  title: ReactNode;
  intro?: string;
  children?: ReactNode;
}) {
  return (
    <div className="border-b border-charcoal/12 px-6 pt-[16vh] pb-[8vh] md:px-[4.5vw] md:pt-[18vh] md:pb-[10vh]">
      <Breadcrumb items={breadcrumb} />
      <div className="mt-6 flex items-center gap-3.5">
        <span className="font-mono-label text-[9.5px] tracking-[0.24em] opacity-50">{eyebrow}</span>
        <span className="h-px w-[60px] bg-current/20" />
      </div>
      <h1 className="m-0 mt-6 text-[clamp(36px,6.4vw,96px)] leading-[0.9] font-extrabold tracking-[-0.045em] uppercase [font-stretch:114%]">
        {title}
      </h1>
      {intro && (
        <p className="m-0 mt-6 max-w-[56ch] text-pretty text-[15px] leading-[1.66] opacity-70">
          {intro}
        </p>
      )}
      {children}
    </div>
  );
}
