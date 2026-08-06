"use client";

import { useRef, type ReactNode } from "react";
import Link from "next/link";
import clsx from "clsx";

type MagneticLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  arrow?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
};

export default function MagneticLink({
  href,
  children,
  className,
  arrow = false,
  onClick,
  onMouseEnter,
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
    const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
    el.style.transform = `translate3d(${(dx * 9).toFixed(1)}px, ${(dy * 6).toFixed(1)}px, 0)`;
    if (arrowRef.current) arrowRef.current.style.transform = "translateX(6px)";
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate3d(0,0,0)";
    if (arrowRef.current) arrowRef.current.style.transform = "translateX(0)";
  };

  const content = (
    <>
      {children}
      {arrow && (
        <span
          ref={arrowRef}
          className="font-mono-label transition-transform duration-[450ms] ease-[cubic-bezier(.2,.7,.2,1)]"
        >
          →
        </span>
      )}
    </>
  );

  const sharedClassName = clsx(
    "inline-flex items-center gap-3 transition-transform duration-200 ease-out",
    className,
  );

  const isInternal = href.startsWith("/");

  if (isInternal) {
    return (
      <Link
        ref={ref}
        href={href}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={sharedClassName}
      >
        {content}
      </Link>
    );
  }

  return (
    <a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={sharedClassName}
    >
      {content}
    </a>
  );
}
