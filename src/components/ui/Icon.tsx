import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const strokeBase = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function PhoneIcon(props: IconProps) {
  return (
    <svg {...strokeBase} {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.22 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export function PinIcon(props: IconProps) {
  return (
    <svg {...strokeBase} {...props}>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

export function FacebookIcon(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

export function DocumentIcon(props: IconProps) {
  return (
    <svg {...strokeBase} {...props}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 13h8M8 17h8M8 9h2" />
    </svg>
  );
}

export function CompassIcon(props: IconProps) {
  return (
    <svg {...strokeBase} {...props}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M15.5 8.5 13.3 13.3 8.5 15.5l2.2-4.8z" />
    </svg>
  );
}

export function StoreIcon(props: IconProps) {
  return (
    <svg {...strokeBase} {...props}>
      <path d="M3 9.5 4 4h16l1 5.5" />
      <path d="M3 9.5a2.3 2.3 0 0 0 4.5.3 2.3 2.3 0 0 0 4.5-.1 2.3 2.3 0 0 0 4 .1 2.3 2.3 0 0 0 4.5-.3" />
      <path d="M4.5 10.2V20h15v-9.8" />
      <path d="M9.5 20v-5.5h5V20" />
    </svg>
  );
}

export function TiltIcon(props: IconProps) {
  return (
    <svg {...strokeBase} {...props}>
      <rect x="6.5" y="3.5" width="11" height="17" rx="2" transform="rotate(-14 12 12)" />
      <path d="M4 20.5h5" />
    </svg>
  );
}

export function ZoomIcon(props: IconProps) {
  return (
    <svg {...strokeBase} {...props}>
      <circle cx="10.5" cy="10.5" r="7" />
      <path d="M20 20l-4.8-4.8" />
      <path d="M10.5 7.5v6M7.5 10.5h6" />
    </svg>
  );
}

export function ExpandIcon(props: IconProps) {
  return (
    <svg {...strokeBase} {...props}>
      <path d="M9 4H4v5M15 4h5v5M4 15v5h5M20 15v5h-5" />
    </svg>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...strokeBase} {...props}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M2.5 12h19M12 2.5c2.8 2.6 4.2 5.9 4.2 9.5s-1.4 6.9-4.2 9.5c-2.8-2.6-4.2-5.9-4.2-9.5S9.2 5.1 12 2.5z" />
    </svg>
  );
}

export function ShieldIcon(props: IconProps) {
  return (
    <svg {...strokeBase} {...props}>
      <path d="M12 2.5 4.5 5.5v6c0 5 3.2 8.4 7.5 10 4.3-1.6 7.5-5 7.5-10v-6z" />
      <path d="M8.5 12.2 11 14.7l4.5-5" />
    </svg>
  );
}

export function LayersIcon(props: IconProps) {
  return (
    <svg {...strokeBase} {...props}>
      <path d="M12 3 2.5 8 12 13l9.5-5z" />
      <path d="M2.5 12 12 17l9.5-5" />
      <path d="M2.5 16 12 21l9.5-5" />
    </svg>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <svg {...strokeBase} {...props}>
      <path d="M12 3v12" />
      <path d="M7.5 10.5 12 15l4.5-4.5" />
      <path d="M4 19.5h16" />
    </svg>
  );
}

export function EyeIcon(props: IconProps) {
  return (
    <svg {...strokeBase} {...props}>
      <path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

export function DiamondIcon(props: IconProps) {
  return (
    <svg {...strokeBase} {...props}>
      <path d="M7 3h10l4 6-11 12L2 9z" />
      <path d="M2 9h20M9 3l-2 6 5 12 5-12-2-6" />
    </svg>
  );
}

export function HomeIcon(props: IconProps) {
  return (
    <svg {...strokeBase} {...props}>
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5.5 9v11h13V9" />
      <path d="M10 20v-6h4v6" />
    </svg>
  );
}

export function ApertureIcon(props: IconProps) {
  return (
    <svg {...strokeBase} {...props}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <rect x="8" y="8" width="8" height="8" rx="1.2" />
    </svg>
  );
}
