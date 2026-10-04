import { text, list, cents, date, ref, check, pair } from "./index.mjs";

export function prepare(x) {
  const a = x.left,
    b = x.right;
  if (!a || !b) throw new TypeError("left et right requis");
  text(a.candidate);
  text(b.candidate);
  const checks = [],
    pairs = [];
  const refs = ref(a.docId, b.docId);
  for (const k of ["audience", "mechanism", "funding", "conditions"])
    pairs.push(
      pair(
        k,
        {
          audience: "Public",
          mechanism: "Mécanisme",
          funding: "Financement",
          conditions: "Conditions",
        }[k],
        a[k],
        b[k],
        refs,
        `Les deux propositions ont-elles le même ${k === "audience" ? "public" : k === "mechanism" ? "mécanisme" : k === "funding" ? "financement" : "ensemble de conditions"} explicite ? N’évaluez ni leur mérite ni leur faisabilité, et ne supposez pas une information absente.`,
      ),
    );
  if (a.effectiveDate !== undefined) date(a.effectiveDate);
  if (b.effectiveDate !== undefined) date(b.effectiveDate);
  checks.push(
    check(
      "calendrier",
      "Calendrier de mise en œuvre",
      a.effectiveDate && b.effectiveDate
        ? a.effectiveDate === b.effectiveDate
        : null,
      refs,
    ),
  );
  return {
    checks,
    pairs,
    outputs: {
      candidates: [a.candidate, b.candidate],
      interpretation:
        "Étaye = comparable sur les dimensions fournies ; écart = différence documentée. Aucun score ni recommandation électorale.",
      dimensions: [
        "public",
        "mécanisme",
        "financement",
        "conditions",
        "calendrier",
      ],
    },
  };
}

function requiredDoc(o) {
  if (!o || typeof o !== "object") throw new TypeError("Objet métier requis");
  text(o.docId, "docId requis");
}
export function validateInput(x) {
  requiredDoc(x.left);
  requiredDoc(x.right);
}
