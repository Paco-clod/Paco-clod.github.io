# Portfolio de Pacôme SODAZINDJI

Portfolio professionnel consacré à la **Data**, à l’**intelligence artificielle**, à la **Business Intelligence** et à la transformation numérique. Le projet présente les réalisations, les distinctions, les interventions et le parcours de Pacôme SODAZINDJI, étudiant en Master 1 Big Data & IA à l’ESIEE-IT.

> **Disponibilité :** stage M1 à partir d’avril 2027, puis alternance M2 à partir de septembre 2027, avec ouverture possible en octobre ou novembre selon les calendriers d’entreprise.

## Présentation technique

Le dépôt contient deux générations du front-end :

| Partie | Emplacement | État |
| --- | --- | --- |
| Site multi-pages HTML/CSS/JavaScript | Racine du dépôt | Version actuellement publiée et préservée |
| Nouvelle interface React/TypeScript | [`frontend/`](frontend/) | Migration isolée, validée par CI, non substituée automatiquement |

Cette organisation permet de moderniser progressivement l’interface sans interrompre le site public existant.

## Architecture

```text
                         GitHub Pages
                              │
          ┌───────────────────┴───────────────────┐
          │                                       │
   Site HTML actuel                    Frontend React + TypeScript
   index.html, projets.html            frontend/ · Vite
   github.html, contact.html                    │
          │                              GitHub API
          │                              API FastAPI
          │                                       │
          └───────────────┐               Azure App Service
                          │                       │
                     FastAPI                    MongoDB Atlas
                 backend/main.py
```

### Technologies

- **Front-end historique :** HTML5, CSS3, JavaScript moderne, Font Awesome, Calendly.
- **Front-end en migration :** React 18, TypeScript strict, Vite.
- **Back-end :** Python, FastAPI asynchrone, Uvicorn/Gunicorn.
- **Données :** MongoDB Atlas.
- **Intégrations :** GitHub API, Calendly, API de contact.
- **Infrastructure :** Docker, Azure App Service, GitHub Actions.
- **Qualité :** vérification TypeScript, build Vite, audit npm et validation CI.

## Fonctionnalités

- Présentation professionnelle et recherche de stage/alternance ;
- thème sombre et clair persistant ;
- navigation responsive avec menu mobile ;
- catalogue de réalisations filtrable ;
- projets Data/IA : AgroClimat, NFL Big Data Bowl Paris et Credit Scoring ;
- projets web et digitaux : AS Capital Investment, APG DEO GRATIAS BUSINESS, FASEG, CRECI-UP et VSOFT ;
- projets de transformation SI : AXI’HOM, e-services GIZ et digitalisation RH LNB ;
- récupération des dépôts GitHub avec langage, description, étoiles et lien source ;
- timeline des diplômes et certifications ;
- distinctions DSI Awards 2024 en Data Science & IA et Agriculture ;
- intervention ERSUMA/OHADA et participation au COPMAN ;
- prise de rendez-vous Calendly ;
- formulaire de contact relié à FastAPI ;
- téléchargement du CV, appel direct et contact WhatsApp.

## Démarrer la migration React

Prérequis :

- Node.js LTS ;
- npm.

Depuis la racine du dépôt :

```bash
cd frontend
npm ci
npm run dev
```

La nouvelle interface est ensuite accessible à l’adresse indiquée par Vite, généralement `http://localhost:5173`.

### Variables d’environnement

Le front-end utilise une valeur par défaut pour l’API publique. Pour un autre environnement, copier `frontend/.env.example` vers `frontend/.env.local` :

```env
VITE_API_BASE_URL=https://votre-api.example.com
```

Les fichiers `.env` ne doivent jamais être commités.

## Vérification et build

```bash
cd frontend
npm run check
npm run build
npm audit --omit=dev
```

Le build produit `frontend/dist/`. Ce dossier est ignoré par Git et n’est pas publié par le workflow actuel.

## Intégration continue

Le workflow [`react-frontend-check.yml`](.github/workflows/react-frontend-check.yml) s’exécute pour les modifications du dossier `frontend/` et :

1. installe Node.js 22 ;
2. installe les dépendances avec `npm ci` ;
3. exécute le contrôle TypeScript ;
4. génère le build Vite.

Il s’agit volontairement d’un workflow de **validation uniquement**. Il ne remplace pas le workflow de déploiement de l’API et ne modifie pas le site actuellement publié.

## Organisation du code React

```text
frontend/
├── src/
│   ├── App.tsx                 # navigation et pages React
│   ├── data.ts                 # projets et timeline
│   ├── types.ts                # contrats TypeScript
│   ├── services/
│   │   ├── githubApi.ts        # lecture des dépôts GitHub
│   │   └── portfolioApi.ts     # envoi du formulaire FastAPI
│   ├── main.tsx                # point d’entrée React
│   └── styles.css              # design responsive
├── package.json
├── package-lock.json
└── vite.config.ts
```

## Sécurité et bonnes pratiques

- Les secrets et fichiers `.env` sont exclus par `.gitignore`.
- Les appels API vérifient les statuts HTTP et exposent un état d’erreur à l’utilisateur.
- Les liens externes ouverts dans un nouvel onglet utilisent `rel="noreferrer"`.
- Le backend conserve une configuration CORS explicite.
- Les dépendances sont verrouillées par `package-lock.json`.
- Le front-end React et le back-end restent découplés.

## Déploiement

Le site public actuel reste déployé selon son architecture existante. La migration React sera publiée uniquement après validation visuelle, validation responsive, vérification des formulaires et décision explicite de bascule.

## Contact

- Portfolio : [sodazindj-pacome.me](https://sodazindj-pacome.me)
- GitHub : [github.com/Paco-clod](https://github.com/Paco-clod)
- LinkedIn : [Pacôme SODAZINDJI](https://www.linkedin.com/in/pacome-sodazindji-55a6821b/)
- Email : [comepaco0@gmail.com](mailto:comepaco0@gmail.com)
