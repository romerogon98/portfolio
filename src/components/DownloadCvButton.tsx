// Downloads the pre-rendered PDF (see scripts/cv-pdf.mjs) rather than opening
// the print dialog: a headless-Chrome PDF keeps real spaces in its text layer,
// which some browsers' Save as PDF drops, breaking ATS parsing.
export const CV_PDF = "/cv/Gonzalo-Romero_CV.pdf";

export default function DownloadCvButton({
  className = "",
}: {
  className?: string;
}) {
  return (
    <a
      href={CV_PDF}
      download="Gonzalo-Romero_CV.pdf"
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
    </a>
  );
}
