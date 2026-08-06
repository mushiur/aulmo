import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="font-mono-label text-[10px] tracking-[0.2em] uppercase opacity-50"
    >
      {items.map((item, i) => (
        <span key={item.label}>
          {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
          {i < items.length - 1 && <span className="px-2">/</span>}
        </span>
      ))}
    </nav>
  );
}
