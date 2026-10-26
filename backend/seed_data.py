import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)
db = client["portfolio_db"]

# 1. Projets Clients & SI
projets = [
    {
        "id_projet": "axi-hom",
        "titre": "AXI'HOM - Orientation du Capital Humain",
        "role": "Co-Promoteur & Architecte SI",
        "organisation": "AXI'HOM (Marque aux Trophées Republik RH 2026)",
        "description": "Plateforme stratégique d'évaluation et d'orientation du capital humain pour accompagner les décideurs dans leurs recrutements et gouvernance.",
        "categorie": "SI / RH / IA",
        "liens": ["https://axi-hom.com", "https://axi-hom.ai", "https://axi-hom.net"]
    },
    {
        "id_projet": "giz-eservices",
        "titre": "Digitalisation des e-Services Publics",
        "role": "Consultant en Digitalisation",
        "organisation": "GIZ & Ministères (MJL, MAEP, MTFP, MS)",
        "description": "Analyse des besoins fonctionnels, dématérialisation des services publics et sécurisation des échanges inter-systèmes (protection des données).",
        "categorie": "Digitalisation / Secteur Public",
        "liens": []
    },
    {
        "id_projet": "lnb-rh",
        "titre": "Digitalisation des Processus RH",
        "role": "Consultant Digitalisation RH",
        "organisation": "Loterie Nationale du Bénin S.A (LNB)",
        "description": "Diagnostic, optimisation et dématérialisation des procédures administratives, gestion des carrières et du personnel.",
        "categorie": "RH & SI",
        "liens": []
    },
    {
        "id_projet": "k-polygone",
        "titre": "Étude de Faisabilité Hôtelière & BI",
        "role": "Consultant Data Analyst & Visualisation",
        "organisation": "K-POLYGONE PROPERTIES & GDB & ASSOCIÉS",
        "description": "Conception d'outils de collecte, analyse de marché à Azowlissè et modélisation d'un tableau de bord dynamique sur Power BI.",
        "categorie": "Business Intelligence & Data",
        "liens": []
    },
    {
        "id_projet": "vsoft-web",
        "titre": "Plateformes Web Institutionnelles & SEO",
        "role": "Consultant IT & Web",
        "organisation": "VSOFT CORPORATION / Université de Parakou",
        "description": "Développement technique et optimisation SEO des plateformes FASEG (fasegup.com), CRECI-UP et Sauver l'Éducation.",
        "categorie": "Web & SEO",
        "liens": ["https://fasegup.com", "https://creci-up.org"]
    }
]

# 2. Distinctions & Interventions
interventions = [
    {
        "titre": "Attestation de Panéliste / Communicateur",
        "institution": "ERSUMA - OHADA",
        "evenement": "Colloque International 'L'IA et l'Afrique : regards croisés'",
        "periode": "Octobre 2025 - Février 2026",
        "lieu": "Porto-Novo (Bénin)",
        "volume_horaire": "16 heures de préparation et d'animation"
    },
    {
        "titre": "2ème Prix - Data Science & IA",
        "institution": "Club DSI Bénin & EY",
        "evenement": "DSI Awards Bénin 2024",
        "periode": "2024",
        "lieu": "Cotonou (Bénin)",
        "volume_horaire": "Trophée Plexi"
    },
    {
        "titre": "2ème Prix - Prix Agriculture",
        "institution": "Club DSI Bénin & EY",
        "evenement": "DSI Awards Bénin 2024 (Projet AgroClimat)",
        "periode": "2024",
        "lieu": "Cotonou (Bénin)",
        "volume_horaire": "Trophée Plexi"
    }
]

def run_seeding():
    print("🧹 Nettoyage des anciennes collections de test...")
    db.projets_clients.delete_many({})
    db.interventions.delete_many({})

    print("📥 Insertion des projets clients...")
    db.projets_clients.insert_many(projets)

    print("📥 Insertion des distinctions et interventions...")
    db.interventions.insert_many(interventions)

    print("✅ Seeding terminé avec succès dans MongoDB Atlas !")

if __name__ == "__main__":
    run_seeding()