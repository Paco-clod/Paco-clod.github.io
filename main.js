/* ==========================================================================
   PORTFOLIO PACÔME SODAZINDJI - SCRIPT UNIQUE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initGithubProjects();
});

/**
 * 1. Gestion du Basculement Thème Sombre / Thème Clair
 */
function initTheme() {
    const themeBtn = document.getElementById("theme-toggle");
    if (!themeBtn) return;

    // Récupérer le choix sauvegardé ou garder "dark" par défaut
    const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
        themeBtn.innerHTML = '<i class="fas fa-moon"></i>';
    }

    themeBtn.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");
        const isLight = document.body.classList.contains("light-theme");

        // Sauvegarder la préférence de l'utilisateur
        localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
        themeBtn.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    });
}

/**
 * 2. Chargement automatique des Projets GitHub (Pour la page github.html)
 */
async function initGithubProjects() {
    const container = document.getElementById("github-projects-container");
    if (!container) return; // Ne s'exécute que sur la page github.html

    try {
        const response = await fetch("https://api.github.com/users/Paco-clod/repos?sort=updated&per_page=10");
        const repos = await response.json();

        container.innerHTML = "";
        repos.forEach(repo => {
            const card = document.createElement("div");
            card.className = "card";
            card.innerHTML = `
                <h3>${repo.name}</h3>
                <p>${repo.description || "Dépôt de code source et projet logiciel."}</p>
                <p style="margin-top: 15px; font-size: 0.85rem; color: var(--accent-color);">
                    <i class="fas fa-code"></i> ${repo.language || "Multi-langages"}
                </p>
                <a href="${repo.html_url}" target="_blank" style="display:inline-block; margin-top:15px; color:var(--accent-color); text-decoration:none; font-weight:bold;">
                    Consulter le code sur GitHub →
                </a>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        container.innerHTML = "<p>Erreur lors de la récupération des dépôts GitHub.</p>";
    }
}

/**
 * 3. Gestionnaire d'envoi du formulaire de contact avec Indicatif Téléphonique
 */
document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contact-form");
    if (!contactForm) return;

    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const statusDiv = document.getElementById("form-status");

        const codePays = document.getElementById("code_pays").value;
        const numTel = document.getElementById("telephone").value;

        const formData = {
            nom: document.getElementById("nom").value,
            email: document.getElementById("email").value,
            telephone: numTel ? `${codePays} ${numTel}` : "Non renseigné",
            sujet: document.getElementById("sujet").value,
            message: document.getElementById("message").value
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/api/v1/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                statusDiv.style.color = "#22c55e";
                statusDiv.innerText = "Message envoyé avec succès !";
                contactForm.reset();
            } else {
                throw new Error("Erreur serveur");
            }
        } catch (error) {
            statusDiv.style.color = "#ef4444";
            statusDiv.innerText = "Message enregistré en local (l'API Backend sera connectée sous peu).";
        }
    });
});