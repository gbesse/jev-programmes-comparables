import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { analyze } from "../src/index.mjs";
const base = JSON.parse(
  await readFile(new URL("../examples/dossier.json", import.meta.url), "utf8"),
);
const clone = structuredClone;

import { importProposals } from "../src/adapters.mjs";
test("Une dimension inventée hors citation est rejetée", () => {
  const a = {
      ...base.left,
      sourceUri: "fixture:a",
      quote: "Ménages à faibles revenus.",
    },
    b = { ...base.right, sourceUri: "fixture:b", quote: base.right.audience };
  assert.throws(() => importProposals(a, b), /citation exacte/);
});
test("Financement non annoncé reste inconnu", async () => {
  const x = clone(base);
  delete x.right.funding;
  assert.equal(
    (await analyze(x)).findings.find((f) => f.id === "funding").status,
    "a_revoir",
  );
});
test("Aucun score de mérite dans la sortie", async () => {
  const r = await analyze(base);
  assert.equal(r.outputs.score, undefined);
  assert.deepEqual(r.outputs.candidates, [
    "Programme fictif A",
    "Programme fictif B",
  ]);
});
