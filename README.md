# Portfolio de Pacôme SODAZINDJI

Portfolio professionnel consacré à la **Data**, à l’**intelligence artificielle**, à la **Business Intelligence** et à la transformation numérique.

> **Disponibilité :** stage M1 à partir d’avril 2027, puis alternance M2 à partir de septembre 2027, avec ouverture possible en octobre ou novembre selon les calendriers d’entreprise.

## Architecture

Le dépôt contient le site actuellement publié et une migration front-end moderne préparée en parallèle :

| Composant | Emplacement | État |
| --- | --- | --- |
| Site public multi-pages | Racine (`index.html`, `projets.html`, etc.) | Version publiée et préservée |
| Nouvelle interface | [`frontend/`](frontend/) | React + TypeScript, validée par CI |
| API | [`backend/`](backend/) | FastAPI asynchrone sur Azure App Service |
| Données | MongoDB Atlas | Base cloud de l’API |

```text
GitHub Pages / front-end
            │
            ├── site HTML actuel
            └── frontend React + TypeScript + Vite
                         │
                    API FastAPI
                         │
                 MongoDB Atlas
```

Cette organisation permet de moderniser progressivement le portfolio sans interrompre la version publique.

## Stack technique

- **Front-end publié :** HTML5, CSS3, JavaScript moderne, Font Awesome, Calendly.
- **Front-end en migration :** React 18, TypeScript strict, Vite.
- **Back-end :** Python, FastAPI asynchrone, Uvicorn/Gunicorn.
- **Données :** MongoDB Atlas.
- **Intégrations :** GitHub API, Calendly et formulaire de contact.
- **Infrastructure :** Docker, Azure App Service et GitHub Actions.

## Fonctionnalités

- présentation professionnelle et recherche de stage/alternance ;
- thème sombre et clair persistant ;
- navigation responsive et menu mobile ;
- catalogue filtrable de projets Data, IA, Web et SI ;
- AgroClimat, NFL Big Data Bowl Paris, AXI’HOM et Credit Scoring ;
- AS Capital Investment, APG DEO GRATIAS BUSINESS, FASEG, CRECI-UP et VSOFT ;
- e-services GIZ et digitalisation RH LNB ;
- dépôts GitHub avec langage, description, étoiles et lien source ;
- timeline des diplômes et certifications ;
- distinctions DSI Awards 2024 en Data Science & IA et Agriculture ;
- intervention ERSUMA/OHADA et participation au COPMAN ;
- Calendly, formulaire FastAPI, CV, téléphone et WhatsApp.
- assistant Kemy avec réponses contrôlées sur le parcours, les projets et les moyens de contact.

## Lancer le front-end React

Prérequis : Node.js LTS et npm.

```bash
cd frontend
npm ci
npm run dev
```

La nouvelle interface est ensuite accessible à l’adresse indiquée par Vite, généralement `http://localhost:5173`.

### Configuration de l’API

Copier `frontend/.env.example` vers `frontend/.env.local` uniquement pour changer l’URL de l’API :

```env
VITE_API_BASE_URL=https://votre-api.example.com
```

Les fichiers `.env` ne doivent jamais être commités.

## Vérification

```bash
cd frontend
npm run check
npm run build
npm audit --omit=dev
```

Le dossier `frontend/dist/` est généré par Vite et ignoré par Git.

## Intégration continue

Le workflow [`react-frontend-check.yml`](.github/workflows/react-frontend-check.yml) valide les modifications du dossier `frontend/` sur les push et pull requests :

1. installation de Node.js 22 ;
2. installation reproductible avec `npm ci` ;
3. contrôle TypeScript ;
4. build Vite de production.

Ce workflow est volontairement limité à la validation. Il ne remplace ni le déploiement Azure de l’API, ni le site actuellement publié.

## Organisation React

```text
frontend/
├── src/
│   ├── App.tsx                 # navigation et pages React
│   ├── data.ts                 # projets et timeline
│   ├── types.ts                # contrats TypeScript
│   ├── services/
│   │   ├── githubApi.ts        # API GitHub
│   │   └── portfolioApi.ts     # formulaire FastAPI
│   ├── main.tsx                # point d’entrée
│   └── styles.css              # design responsive
├── package.json
├── package-lock.json
└── vite.config.ts
```

## Sécurité

- secrets et fichiers `.env` exclus par `.gitignore` ;
- statuts HTTP contrôlés côté front-end ;
- états d’erreur affichés sans fallback silencieux ;
- liens externes sécurisés avec `rel="noreferrer"` ;
- dépendances verrouillées par `package-lock.json` ;
- front-end et back-end découplés.

## Assistant Kemy

Kemy est l’assistante du portfolio. Elle accueille les visiteurs et répond aux questions portant uniquement sur les informations vérifiées du parcours, du CV, des projets, des distinctions, de GitHub, de LinkedIn et des moyens de contact.

La première version utilise une base de connaissances locale et des intentions explicites. Elle ne transmet pas les questions à un fournisseur d’IA externe et répond clairement lorsqu’une information n’est pas disponible. Les dépôts GitHub récupérés à l’ouverture du portfolio peuvent être cités dynamiquement, sans générer de description non fournie par GitHub.

Cette approche privilégie la fiabilité et l’absence d’hallucination. Une évolution vers un modèle génératif pourra être étudiée uniquement avec une base documentaire validée, des citations de sources et des garde-fous côté API.

## Liens

- Portfolio : [sodazindj-pacome.me](https://sodazindj-pacome.me)
- GitHub : [github.com/Paco-clod](https://github.com/Paco-clod)
- LinkedIn : [Pacôme SODAZINDJI](https://www.linkedin.com/in/pacome-sodazindji-55a6821b/)
- Email : [comepaco0@gmail.com](mailto:comepaco0@gmail.com)
