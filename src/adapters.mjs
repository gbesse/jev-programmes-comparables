import { document } from "./io.mjs";
export function importProposals(
  left,
  right,
  { at = new Date().toISOString().slice(0, 10) } = {},
) {
  for (const p of [left, right]) {
    if (!p.sourceUri || !p.quote)
      throw new TypeError("URI et citation exacte de la mesure requises");
    for (const k of ["audience", "mechanism", "funding", "conditions"])
      if (p[k] && !p.quote.includes(p[k]))
        throw new TypeError(
          "Chaque dimension doit être une citation exacte présente dans la mesure : " +
            k,
        );
  }
  const normalized = (p) => {
    const { sourceUri, quote, ...fields } = p;
    return fields;
  };
  return {
    id: "comparaison-mesures",
    left: { ...normalized(left), docId: "mesure-a" },
    right: { ...normalized(right), docId: "mesure-b" },
    documents: [
      document("mesure-a", left.quote, {
        uri: left.sourceUri,
        date: at,
        kind: "citation",
        licence: "À renseigner",
      }),
      document("mesure-b", right.quote, {
        uri: right.sourceUri,
        date: at,
        kind: "citation",
        licence: "À renseigner",
      }),
    ],
  };
}
