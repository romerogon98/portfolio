"use client";

import Image from "next/image";
import { ARTIFACT_PREVIEWS } from "@/artifacts/registry";
import type { ArtifactPreview } from "@/content/artifacts/types";

// Showcase frame for an artifact: the live build, a still or a video. Work is
// presented, not distributed — there is deliberately no source/code view.
// `aspect: "auto"` lets a live component size itself (e.g. a browser mock).
export default function ArtifactViewer({
  preview,
  framed = true,
  className = "",
}: {
  preview: ArtifactPreview;
  framed?: boolean;
  className?: string;
}) {
  const auto = preview.aspect === "auto";
  const body = (
    <>
      {preview.type === "component" &&
        (() => {
          const Preview = ARTIFACT_PREVIEWS[preview.id];
          return <Preview />;
        })()}
      {preview.type === "image" && (
        <Image
          src={preview.src}
          alt={preview.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 1100px"
          className="object-cover"
        />
      )}
      {preview.type === "video" && (
        <video
          src={preview.src}
          poster={preview.poster}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </>
  );

  if (auto) return <div className={className}>{body}</div>;

  return (
    <div
      onContextMenu={(e) => e.preventDefault()}
      className={`relative overflow-hidden ${
        framed ? "rounded-[10px] border border-[var(--a-border)] bg-[var(--a-bg)]" : ""
      } ${preview.aspect ? "" : "h-[420px]"} ${className}`}
      style={preview.aspect ? { aspectRatio: preview.aspect } : undefined}
    >
      {body}
    </div>
  );
}
