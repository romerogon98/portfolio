import { griffin } from "./griffin";
import type { ArtifactClient, ArtifactEntry } from "./types";

export type { ArtifactClient, ArtifactEntry } from "./types";

// Add a client here once its first artifact is documented.
export const ARTIFACT_CLIENTS: ArtifactClient[] = [griffin];

export function getArtifactClient(slug: string) {
  return ARTIFACT_CLIENTS.find((c) => c.slug === slug);
}

/** Published entries (drafts too in dev), newest first, numbered oldest = 001. */
export function artifactEntries(client: ArtifactClient) {
  const showDrafts = process.env.NODE_ENV === "development";
  const visible = client.entries.filter((e) => showDrafts || !e.draft);
  const byDate = [...visible].sort((a, b) => a.date.localeCompare(b.date));
  return byDate
    .map((entry, i) => ({ ...entry, number: String(i + 1).padStart(3, "0") }))
    .reverse();
}

export type NumberedArtifactEntry = ArtifactEntry & { number: string };
