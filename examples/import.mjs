import { readFile, mkdir, writeFile } from "node:fs/promises";
import { analyze, toHtml } from "../src/index.mjs";
const base = JSON.parse(
  await readFile(new URL("./dossier.json", import.meta.url), "utf8"),
);

import { importProposals } from "../src/adapters.mjs";
const wrap = (p) => ({
  ...p,
  sourceUri: "fixture:" + p.candidate,
  quote: [p.audience, p.mechanism, p.funding, p.conditions].join("\n"),
});
const dossier = importProposals(wrap(base.left), wrap(base.right));

for (const d of dossier.documents) {
  d.source.kind = "synthetique";
  d.source.licence = "CC0";
  if (!d.source.uri.startsWith("fixture:")) d.source.uri = "fixture:" + d.id;
}
const report = await analyze(dossier);
await mkdir(new URL("../reports/", import.meta.url), { recursive: true });
await writeFile(
  new URL("../reports/import.html", import.meta.url),
  toHtml(report),
);
console.log(
  JSON.stringify(
    {
      id: report.id,
      status: report.status,
      summary: report.summary,
      outputs: report.outputs,
    },
    null,
    2,
  ),
);
export { dossier, report };
