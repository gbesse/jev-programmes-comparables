# Importer des données

`importProposals` impose des citations exactes présentes dans le texte pour les dimensions public, mécanisme, financement et conditions. Les extraits sans citation ne sont pas inférés. Les candidats du corpus sont fictifs. Aucun programme 2027 complet n’est présumé disponible. Une différence signifie une différence documentée, sans score de mérite, prédiction, recommandation de vote ni jugement de faisabilité.

```sh
npm run demo:import
```

[Code complet de l’import](../examples/import.mjs). Ce parcours passe réellement du format source au rapport JSON/HTML. Les fichiers générés ne contiennent que des données synthétiques. Pour des documents réels confidentiels, écrire les rapports dans `reports/private/` (ignoré par Git), contrôler les droits de fichier et informer les personnes concernées avant un envoi externe.
