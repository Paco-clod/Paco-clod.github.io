# Portfolio React

Nouvelle interface du portfolio, isolée du site HTML actuellement publié.

## Stack

- React 18
- TypeScript en mode strict
- Vite
- API GitHub
- API FastAPI existante pour le contact

## Développement local

Depuis ce dossier :

```bash
npm install
npm run dev
```

Le dossier `assets` du dépôt parent est utilisé comme répertoire public par Vite. Aucun fichier HTML existant ni le backend FastAPI n'est modifié par cette application.

## Validation

```bash
npm run check
npm run build
```

La publication GitHub Pages sera configurée après validation visuelle et fonctionnelle de cette version.

## Assistant Kemy

Kemy est un assistant conversationnel local intégré à l’interface React. Elle répond aux questions sur le parcours, les diplômes, les certifications, les projets, les distinctions, GitHub, LinkedIn, le CV, le téléphone, WhatsApp et Calendly.

Les réponses sont définies dans `src/kemy.ts`. Elles s’appuient uniquement sur les informations validées du portfolio et sur les dépôts GitHub effectivement chargés. Pour éviter toute invention, Kemy indique lorsqu’elle ne dispose pas de l’information demandée. Aucune clé d’API d’IA externe n’est nécessaire pour cette version.
