import type { Dossier, Document } from "./index.mjs";
export function importProposals(
  left: Record<string, unknown>,
  right: Record<string, unknown>,
  options?: { at?: string },
): Dossier;
