import type { CaseStudy } from "@/content/work/types";
import { keycard } from "./keycard";
import { arcade } from "./arcade";
import { superwall } from "./superwall";
import { vu } from "./vu";
import { causely } from "./causely";
import { dystil } from "./dystil";
import { emergence } from "./emergence";
import { resolve } from "./resolve";
import { workada } from "./workada";

// Add an entry here as each project gets a real, documented case study.
export const DOCUMENTED: Record<string, CaseStudy> = {
  keycard,
  arcade,
  superwall,
  vu,
  causely,
  dystil,
  emergence,
  resolve,
  workada,
};
