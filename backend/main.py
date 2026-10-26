import os
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field
from pymongo import MongoClient
from dotenv import load_dotenv

# Chargement des variables d'environnement (.env)
load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

if not MONGO_URI:
    raise ValueError("L'URI MongoDB n'est pas configurée dans le fichier .env")

# Connexion MongoDB Atlas
try:
    client = MongoClient(MONGO_URI)
    db = client["portfolio_db"]
    # Verification de la connexion
    client.admin.command('ping')
    print(" Connexion reussie a MongoDB Atlas !")
except Exception as e:
    print(f" Erreur de connexion a MongoDB Atlas: {e}")

# Initialisation FastAPI
app = FastAPI(
    title="API Portfolio - Pacome Donan SODAZINDJI",
    description="API FastAPI asynchrone connectee a MongoDB Atlas pour alimenter le portfolio.",
    version="1.0.0"
)

# Configuration CORS (autorise votre domaine Namecheap et GitHub Pages)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://sodazindj-pacome.me",
        "https://Paco-clod.github.io",
        "http://127.0.0.1:5500",
        "http://localhost:3000",
        "*"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- MODELES DE DONNEES (PYDANTIC) ---

class ContactForm(BaseModel):
    nom: str = Field(..., min_length=2, example="Jean Dupont")
    email: EmailStr = Field(..., example="jean.dupont@example.com")
    telephone: str = Field(default="Non renseigne", example="+33 6 05 83 73 68")
    sujet: str = Field(..., min_length=3, example="Proposition d'alternance Data & IA")
    message: str = Field(..., min_length=10, example="Bonjour Pacome, nous serions intenses par votre profil...")


# --- ROUTES API ---

@app.get("/")
def read_root():
    return {
        "status": "online",
        "message": "Bienvenue sur l'API du Portfolio de Pacome Donan SODAZINDJI",
        "documentation": "/docs"
    }


@app.post("/api/v1/contact", status_code=status.HTTP_201_CREATED)
async def create_contact_message(form_data: ContactForm):
    """
    Enregistre les messages recus depuis le formulaire de contact dans MongoDB Atlas.
    """
    try:
        messages_collection = db["messages_contact"]
        message_dict = form_data.dict()

        # Insertion dans la base
        result = messages_collection.insert_one(message_dict)

        return {
            "status": "success",
            "message": "Votre message a ete enregistre avec succes !",
            "id": str(result.inserted_id)
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erreur lors de l'enregistrement dans la base de donnees : {str(e)}"
        )


@app.get("/api/v1/projets")
async def get_projets():
    """
    Recupere la liste des projets clients enregistres dans MongoDB Atlas.
    """
    try:
        projets_collection = db["projets_clients"]
        projets = list(projets_collection.find({}, {"_id": 0}))
        return {"status": "success", "count": len(projets), "data": projets}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erreur lors de la recuperation des projets"
        )

@app.get("/api/v1/projets-clients")
async def get_projets_clients():
    """Récupère les projets clients et missions SI depuis MongoDB Atlas"""
    try:
        projets = list(db.projets_clients.find({}, {"_id": 0}))
        return {"status": "success", "data": projets}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/v1/interventions")
async def get_interventions():
    """Récupère les distinctions et interventions ERSUMA / DSI Awards"""
    try:
        interventions = list(db.interventions.find({}, {"_id": 0}))
        return {"status": "success", "data": interventions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))