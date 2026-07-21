import type { ReactNode } from "react";

// Inline link with the footer-email stroke treatment: a faint rule at rest that
// gets overdrawn left-to-right in brand orange on hover. inline-block keeps the
// absolute rule anchored without breaking the surrounding text flow.
export default function StrokeLink({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`group relative inline-block ${className}`}
    >
      {children}
      <span className="absolute -bottom-0.5 left-0 block h-px w-full bg-current opacity-30" />
      <span className="absolute -bottom-0.5 left-0 block h-px w-full origin-left scale-x-0 bg-accent-500 transition-transform duration-500 ease-out group-hover:scale-x-100" />
    </a>
  );
}
