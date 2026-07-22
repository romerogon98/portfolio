"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, MouseEvent, ReactNode } from "react";
import { navigateWithTransition } from "@/components/PageTransition";

type TransitionLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
};

// Drop-in replacement for next/link that plays the curtain transition on
// plain left-clicks, while leaving modifier-key / middle clicks (open in new
// tab, etc.) to behave exactly like a normal link.
export default function TransitionLink({
  href,
  onClick,
  children,
  ...rest
}: TransitionLinkProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

    e.preventDefault();
    navigateWithTransition(href);
  };

  return (
    <Link href={href} onClick={handleClick} {...rest}>
      {children}
    </Link>
  );
}
