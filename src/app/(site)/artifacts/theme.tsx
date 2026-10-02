import { Newsreader } from "next/font/google";
import type { ArtifactClient } from "@/content/artifacts";

// Light editorial serif for client pages (stand-in for Griffin's Cambon).
export const serif = Newsreader({
  variable: "--font-artifact-serif",
  subsets: ["latin"],
  weight: ["300", "400"],
});

// Wraps a client page in that client's palette as CSS variables (--a-*), and
// turns off the site's film grain so the client's background reads true.
export function ClientTheme({
  client,
  children,
}: {
  client: ArtifactClient;
  children: React.ReactNode;
}) {
  const t = client.theme;
  return (
    <div
      data-no-grain
      className={`${serif.variable} min-h-screen bg-[var(--a-bg)] text-[var(--a-fg)]`}
      style={
        {
          "--a-bg": t.bg,
          "--a-fg": t.fg,
          "--a-muted": t.muted,
          "--a-surface": t.surface,
          "--a-border": t.border,
        } as React.CSSProperties
      }
    >
      {/* Hide the site's film grain (components/Noise) while a client page is mounted. */}
      <style>{"body:has([data-no-grain]) .site-grain{display:none}"}</style>
      {children}
    </div>
  );
}
