# main.py
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from pymongo import MongoClient
import os

app = FastAPI(
    title="API Portfolio - Pacôme Donan SODAZINDJI",
    description="API pour gérer le catalogue de projets, certifications et messages de contact.",
    version="1.0.0"
)

# Configuration CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permet la connexion depuis GitHub Pages ou le domaine Namecheap
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connexion MongoDB Atlas
MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://donanpacomesodazindji_db_user:HRMVQOpfCTWjFVvM@portfoliocluster0.hipp8gb.mongodb.net/?retryWrites=true&w=majority")
client = MongoClient(MONGO_URI)
db = client["portfolio_db"]

class ContactForm(BaseModel):
    nom: str
    email: EmailStr
    sujet: str
    message: str

@app.get("/api/v1/projets")
async def get_projets():
    """Récupère les projets clients et missions d'études"""
    projets = list(db.projets_clients.find({}, {"_id": 0}))
    return {"status": "success", "data": projets}

@app.get("/api/v1/certifications")
async def get_certifications():
    """Récupère les diplômes, distinctions (DSI Awards) et attestations (ERSUMA)"""
    certs = list(db.certifications.find({}, {"_id": 0}))
    return {"status": "success", "data": certs}

@app.post("/api/v1/contact")
async def submit_contact(form: ContactForm):
    """Enregistre les messages dans MongoDB Atlas"""
    try:
        db.messages_contact.insert_one(form.dict())
        return {"status": "success", "message": "Votre message a été transmis avec succès."}
    except Exception as e:
        raise HTTPException(status_code=500, detail="Erreur lors de l'enregistrement.")