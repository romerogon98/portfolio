// Film-grain texture layered over the whole site. Fixed and non-interactive.
// Deliberately NOT mix-blend-overlay: overlay multiplies against a dark
// backdrop, so on this near-black site the grain cancelled out to nothing.
// Plain alpha keeps it visible on both the dark pages and the white CV.
const NOISE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function Noise() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[60] opacity-[0.15] print:hidden"
      style={{ backgroundImage: NOISE, backgroundSize: "200px 200px" }}
    />
  );
}
