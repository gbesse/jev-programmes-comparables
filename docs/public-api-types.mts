import { analyze, toHtml, type Dossier, type Report } from "../src/index.mjs";
import { createJevClient } from "../src/jev.mjs";
import * as adapters from "../src/adapters.mjs";
const dossier: Dossier = {
  left: {
    docId: "a",
    candidate: "Programme fictif A",
    audience: "Ménages à faibles revenus.",
    mechanism: "Verser une aide mensuelle directement au ménage.",
    funding: "Financement par le budget général.",
    conditions: "Sous condition de ressources.",
    effectiveDate: "2027-01-01",
  },
  right: {
    docId: "b",
    candidate: "Programme fictif B",
    audience: "Foyers disposant de revenus modestes.",
    mechanism: "Verser une aide mensuelle directement au ménage.",
    funding: "Financement par le budget général.",
    conditions: "Sous condition de ressources.",
    effectiveDate: "2027-01-01",
  },
  id: "jev-programmes-comparables-dev-paraphrase",
  documents: [
    {
      id: "a",
      text: 'dossier.left : {"candidate": "Programme fictif A", "audience": "Ménages à faibles revenus.", "mechanism": "Verser une aide mensuelle directement au ménage.", "funding": "Financement par le budget général.", "conditions": "Sous condition de ressources.", "effectiveDate": "2027-01-01"}',
      source: {
        uri: "fixture:a",
        date: "2026-10-04",
        licence: "CC0",
        kind: "synthetique",
      },
    },
    {
      id: "b",
      text: 'dossier.right : {"candidate": "Programme fictif B", "audience": "Foyers disposant de revenus modestes.", "mechanism": "Verser une aide mensuelle directement au ménage.", "funding": "Financement par le budget général.", "conditions": "Sous condition de ressources.", "effectiveDate": "2027-01-01"}',
      source: {
        uri: "fixture:b",
        date: "2026-10-04",
        licence: "CC0",
        kind: "synthetique",
      },
    },
  ],
};
const report: Report = await analyze(dossier, {
  mode: "jev",
  provider: createJevClient({ apiKey: "exemple-de-type" }),
});
const html: string = toHtml(report);
void html;
void adapters;
// @ts-expect-error Un dossier vide ne respecte pas le contrat métier.
await analyze({ id: "incomplet", documents: [] });
