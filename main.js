/* ==========================================================================
   PORTFOLIO PACÔME SODAZINDJI - SCRIPT UNIQUE
   ========================================================================== */

const API_BASE_URL = "https://api-pacome-sodazindji-a4dsedfrfncaf3dq.belgiumcentral-01.azurewebsites.net";

document.addEventListener("DOMContentLoaded", () => {
    initTheme();
    initMobileMenu();
    initProjectFilters();
    initGithubProjects();
    initContactForm();
});

function initMobileMenu() {
    const menuButton = document.getElementById("menu-toggle");
    const navigation = document.getElementById("site-navigation");
    if (!menuButton || !navigation) return;

    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("is-open");
        menuButton.classList.toggle("is-open", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
        document.body.classList.toggle("menu-open", isOpen);
    });

    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navigation.classList.remove("is-open");
            menuButton.classList.remove("is-open");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.setAttribute("aria-label", "Ouvrir le menu");
            document.body.classList.remove("menu-open");
        });
    });
}

function initTheme() {
    const themeBtn = document.getElementById("theme-toggle");
    if (!themeBtn) return;

    const savedTheme = localStorage.getItem("portfolio-theme");
    if (savedTheme === "light") {
        document.body.classList.add("light-theme");
    }

    updateThemeButton(themeBtn);
    themeBtn.addEventListener("click", () => {
        const isLight = document.body.classList.toggle("light-theme");
        localStorage.setItem("portfolio-theme", isLight ? "light" : "dark");
        updateThemeButton(themeBtn);
    });
}

function updateThemeButton(button) {
    const isLight = document.body.classList.contains("light-theme");
    button.innerHTML = isLight
        ? '<i class="fas fa-moon" aria-hidden="true"></i>'
        : '<i class="fas fa-sun" aria-hidden="true"></i>';
    button.setAttribute("aria-label", isLight ? "Activer le thème sombre" : "Activer le thème clair");
    button.setAttribute("aria-pressed", String(isLight));
}

function initProjectFilters() {
    const buttons = document.querySelectorAll("[data-filter]");
    const projects = document.querySelectorAll(".project-item");
    if (!buttons.length || !projects.length) return;

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const filter = button.dataset.filter;
            buttons.forEach((item) => {
                item.classList.toggle("active", item === button);
                item.setAttribute("aria-pressed", String(item === button));
            });
            projects.forEach((project) => {
                project.hidden = filter !== "all" && !project.classList.contains(filter);
            });
        });
    });
}

async function initGithubProjects() {
    const container = document.getElementById("github-projects-container");
    if (!container) return;

    try {
        const response = await fetch(
            "https://api.github.com/users/Paco-clod/repos?sort=updated&per_page=100"
        );
        if (!response.ok) {
            throw new Error(`GitHub API: ${response.status}`);
        }

        const repos = await response.json();
        if (!Array.isArray(repos)) {
            throw new Error("Réponse GitHub invalide");
        }

        container.replaceChildren();
        if (!repos.length) {
            container.innerHTML = "<p>Aucun dépôt public à afficher.</p>";
            return;
        }

        repos.forEach((repo) => {
            const card = document.createElement("article");
            card.className = "card github-card";
            card.innerHTML = `
                <div class="github-card-header">
                    <h3>${escapeHtml(repo.name)}</h3>
                    <span class="repo-stars"><i class="fas fa-star" aria-hidden="true"></i> ${repo.stargazers_count}</span>
                </div>
                <p>${escapeHtml(repo.description || "Dépôt de code source et projet logiciel.")}</p>
                <div class="github-card-footer">
                    <span class="badge-tech">${escapeHtml(repo.language || "Multi-langages")}</span>
                    <a href="${escapeHtml(repo.html_url)}" target="_blank" rel="noopener noreferrer">
                        Code source <span aria-hidden="true">→</span>
                    </a>
                </div>
            `;
            container.appendChild(card);
        });
    } catch (error) {
        console.error("Impossible de charger les dépôts GitHub.", error);
        container.innerHTML = "<p class=\"error-message\">Les dépôts GitHub sont momentanément indisponibles.</p>";
    }
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;"
    }[character]));
}

function initContactForm() {
    const contactForm = document.getElementById("contact-form");
    if (!contactForm) return;

    contactForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        const statusDiv = document.getElementById("form-status");
        const submitButton = contactForm.querySelector("button[type='submit']");
        const codePays = document.getElementById("code_pays").value;
        const numTel = document.getElementById("telephone").value.trim();

        const formData = {
            nom: document.getElementById("nom").value.trim(),
            email: document.getElementById("email").value.trim(),
            telephone: numTel ? `${codePays} ${numTel}` : "Non renseigné",
            sujet: document.getElementById("sujet").value.trim(),
            message: document.getElementById("message").value.trim()
        };

        submitButton.disabled = true;
        statusDiv.textContent = "Envoi en cours…";
        statusDiv.className = "form-status";

        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error(`API contact: ${response.status}`);
            }

            statusDiv.textContent = "Message envoyé avec succès !";
            statusDiv.classList.add("success");
            contactForm.reset();
        } catch (error) {
            console.error("Erreur lors de l'envoi du formulaire.", error);
            statusDiv.textContent = "Erreur lors de la transmission du message. Réessayez plus tard.";
            statusDiv.classList.add("error");
        } finally {
            submitButton.disabled = false;
        }
    });
}
