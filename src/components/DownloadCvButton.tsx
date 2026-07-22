"use client";

// Triggers the browser's print / save-as-PDF dialog. The CV page ships with
// print styles that keep a clean light layout and drop the chrome, so
// "Save as PDF" produces a proper downloadable résumé.
export default function DownloadCvButton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`cv-no-print inline-flex items-center gap-2 rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-600 ${className}`}
    >
      Download CV
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M12 3v12m0 0l-4-4m4 4l4-4M5 21h14"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
