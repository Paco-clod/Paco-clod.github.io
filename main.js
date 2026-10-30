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
    initKemyAssistant();
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

function initKemyAssistant() {
    if (document.querySelector(".legacy-kemy-widget")) return;

    const widget = document.createElement("aside");
    widget.className = "legacy-kemy-widget";
    widget.setAttribute("aria-label", "Assistant Kemy");
    widget.innerHTML = `
        <div class="legacy-kemy-panel" hidden>
            <div class="legacy-kemy-header">
                <span class="legacy-kemy-avatar" aria-hidden="true">K</span>
                <div><strong>Kemy</strong><small>Assistant du portfolio</small></div>
                <button type="button" class="legacy-kemy-close" aria-label="Fermer Kemy">×</button>
            </div>
            <div class="legacy-kemy-messages" aria-live="polite">
                <div class="legacy-kemy-message assistant">Bienvenue sur le portfolio de M. Pacôme SODAZINDJI. Que puis-je faire pour vous ?</div>
            </div>
            <div class="legacy-kemy-suggestions">
                <button type="button" data-kemy-question="Quel est son parcours ?">Son parcours</button>
                <button type="button" data-kemy-question="Quels sont ses projets ?">Ses projets</button>
                <button type="button" data-kemy-question="Comment le contacter ?">Le contacter</button>
            </div>
            <form class="legacy-kemy-form">
                <label class="sr-only" for="legacy-kemy-input">Votre question</label>
                <input id="legacy-kemy-input" type="text" placeholder="Posez votre question..." autocomplete="off">
                <button type="submit" aria-label="Envoyer la question">➤</button>
            </form>
        </div>
        <span class="legacy-kemy-hint">Besoin d’une information ?</span>
        <button type="button" class="legacy-kemy-launcher" aria-expanded="false" aria-label="Ouvrir Kemy">
            <span class="legacy-kemy-icon">K</span><span>Kemy</span>
        </button>
    `;
    document.body.appendChild(widget);

    const panel = widget.querySelector(".legacy-kemy-panel");
    const launcher = widget.querySelector(".legacy-kemy-launcher");
    const closeButton = widget.querySelector(".legacy-kemy-close");
    const input = widget.querySelector("#legacy-kemy-input");
    const messages = widget.querySelector(".legacy-kemy-messages");

    const links = {
        cv: "assets/CV_Pacome_SODAZINDJI_Data_IA.pdf",
        phone: "tel:+33605837368",
        whatsapp: "https://wa.me/33605837368",
        calendly: "https://calendly.com/comepaco0",
        github: "https://github.com/Paco-clod",
        linkedin: "https://www.linkedin.com/in/pacome-sodazindji-55a6821b/"
    };

    function setOpen(isOpen) {
        panel.hidden = !isOpen;
        widget.classList.toggle("is-open", isOpen);
        launcher.setAttribute("aria-expanded", String(isOpen));
        launcher.setAttribute("aria-label", isOpen ? "Fermer Kemy" : "Ouvrir Kemy");
        if (isOpen) input.focus();
    }

    function addMessage(content, role, messageLinks = []) {
        const message = document.createElement("div");
        message.className = `legacy-kemy-message ${role}`;
        message.textContent = content;
        messageLinks.forEach((link) => {
            const anchor = document.createElement("a");
            anchor.href = link.href;
            anchor.textContent = `${link.label} →`;
            if (link.href.startsWith("http")) {
                anchor.target = "_blank";
                anchor.rel = "noopener noreferrer";
            }
            message.appendChild(anchor);
        });
        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;
    }

    function answerQuestion(question) {
        const value = question.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        if (!value) return;
        if (/(bonjour|salut|hello|bienvenue)/.test(value)) {
            addMessage("Bienvenue sur mon portfolio. Je suis Pacôme Donan SODAZINDJI. Que puis-je faire pour vous ?", "assistant");
        } else if (/(cv|curriculum|telecharger)/.test(value)) {
            addMessage("Vous pouvez télécharger son CV professionnel au format PDF.", "assistant", [{ label: "Télécharger le CV", href: links.cv }]);
        } else if (/(appeler|telephone|numero|joindre|tel)/.test(value)) {
            addMessage("Vous pouvez me joindre directement au +33 6 05 83 73 68.", "assistant", [{ label: "M’appeler directement", href: links.phone }]);
        } else if (/whatsapp/.test(value)) {
            addMessage("Vous pouvez lui écrire directement sur WhatsApp.", "assistant", [{ label: "Écrire sur WhatsApp", href: links.whatsapp }]);
        } else if (/(rendez-vous|rendez vous|agenda|calendly|disponibilite)/.test(value)) {
            addMessage("Vous pouvez réserver un créneau dans son agenda Calendly.", "assistant", [{ label: "Réserver un rendez-vous", href: links.calendly }]);
        } else if (/(linkedin|profil professionnel)/.test(value)) {
            addMessage("Vous pouvez consulter mon profil professionnel LinkedIn.", "assistant", [{ label: "Voir mon LinkedIn", href: links.linkedin }]);
        } else if (/(github|depot|code source|open source)/.test(value)) {
            addMessage("Je publie mes travaux techniques et mes expérimentations Data/IA sur GitHub.", "assistant", [{ label: "Voir mon GitHub", href: links.github }]);
        } else if (/(contacter|contact|ecrire|joindre|email)/.test(value)) {
            addMessage("Vous pouvez me contacter directement. Je peux échanger sur un projet Data, IA, systèmes d’information ou transformation numérique.", "assistant", [{ label: "Ouvrir la page contact", href: "contact.html" }, { label: "M’écrire sur WhatsApp", href: links.whatsapp }, { label: "Prendre rendez-vous", href: links.calendly }]);
        } else if (/(projet|realisation|travail|portfolio)/.test(value)) {
            addMessage("Je présente mes réalisations en Data & IA, développement web, SEO et consulting SI. Parmi elles : AgroClimat, AXI’HOM, APG DEO GRATIAS BUSINESS, AS Capital Investment et plusieurs missions de digitalisation.", "assistant", [{ label: "Voir mes réalisations", href: "projets.html" }]);
        } else if (/(agroclimat|agriculture|climat)/.test(value)) {
            addMessage("AgroClimat est un projet d’intelligence artificielle conçu à Sèmè City en partenariat avec Sorbonne Université pour soutenir la résilience agricole. Le projet a reçu deux 2ᵉ Prix DSI Awards 2024 : Data Science & IA et Agriculture.", "assistant", [{ label: "Voir les réalisations", href: "projets.html" }]);
        } else if (/(prix|distinction|award|recompense)/.test(value)) {
            addMessage("J’ai reçu deux 2e Prix DSI Awards 2024 pour AgroClimat : Data Science & IA et Agriculture. J’ai également été panéliste et communicateur à l’ERSUMA/OHADA.", "assistant", [{ label: "Voir mes interventions", href: "interventions.html" }]);
        } else if (/(fiable|serieux|serieuse|confiance|digne de confiance|recruter|recrutement|qualite|ponctuel|engagement)/.test(value)) {
            addMessage("Oui, je m’appuie sur des éléments concrets pour démontrer mon sérieux : une Licence en Génie Télécoms et TIC obtenue comme major de promotion, un Master 1 en Big Data & Intelligence Artificielle à l’ESIEE-IT, des certifications en Data, IA, Data Engineering, Power BI et Business Analysis, ainsi qu’une expérience de Responsable Système d’Information jusqu’en août 2026. J’ai aussi conçu AgroClimat, réalisé un stage au SCAI de Sorbonne Université et obtenu deux 2e Prix DSI Awards 2024. Je vous invite à vérifier mon parcours, mes projets et mes réalisations dans mon CV et mon portfolio.", "assistant", [{ label: "Télécharger mon CV", href: links.cv }, { label: "Voir mes réalisations", href: "projets.html" }, { label: "Prendre rendez-vous", href: links.calendly }]);
        } else if (/(qui est pacome|qui est pacôme|presente? pacome|a propos de pacome|a propos de lui|identite)/.test(value)) {
            addMessage("Je suis Pacôme Donan SODAZINDJI, ingénieur informaticien et étudiant en Master 1 Big Data & Intelligence Artificielle à l’ESIEE-IT, à Pontoise. Je suis titulaire d’une Licence en Génie Télécoms et TIC obtenue à l’UCAO/EGEI de Cotonou, où j’ai été major de promotion. Je construis mon parcours à la croisée de la Data, de l’IA, des systèmes d’information et de la transformation numérique. J’ai conçu AgroClimat pendant ma formation IA 360 à Sèmè City en partenariat avec Sorbonne Université, puis réalisé un stage au SCAI. Ce projet m’a valu deux 2e Prix DSI Awards 2024, en Data Science & IA et en Agriculture. J’ai aussi été panéliste et communicateur à l’ERSUMA/OHADA. Après mon expérience comme Responsable SI chez GDB & ASSOCIÉS jusqu’en août 2026, je poursuis aujourd’hui mon Master et je recherche un stage à partir d’avril 2027, puis une alternance en M2 à partir de septembre 2027.", "assistant", [{ label: "Voir mon parcours", href: "index.html#parcours" }, { label: "Télécharger mon CV", href: links.cv }, { label: "Prendre rendez-vous", href: links.calendly }]);
        } else if (/(formation|diplome|master|certification|etude|parcours|experience)/.test(value)) {
            addMessage("Je suis étudiant en Master 1 Big Data & Intelligence Artificielle à l’ESIEE-IT. Je suis titulaire d’une Licence en Génie Télécoms et TIC obtenue à l’UCAO/EGEI de Cotonou, où j’ai été major de promotion.", "assistant", [{ label: "Voir mon parcours", href: "index.html#parcours" }]);
        } else if (/(stage|alternance|recrut|opportunite|emploi)/.test(value)) {
            addMessage("Pacôme recherche un stage M1 à partir d’avril 2027, puis une alternance M2 à partir de septembre 2027, avec une disponibilité possible en octobre ou novembre.", "assistant", [{ label: "Télécharger le CV", href: links.cv }, { label: "Prendre rendez-vous", href: links.calendly }]);
        } else {
            addMessage("Je ne trouve pas cette information dans les données vérifiées du portfolio. Je peux vous renseigner sur son parcours, ses projets, ses distinctions, GitHub, LinkedIn ou ses coordonnées.", "assistant", [{ label: "Télécharger le CV", href: links.cv }, { label: "Contacter Pacôme", href: "contact.html" }]);
        }
    }

    function submit(question) {
        const value = question.trim();
        if (!value) return;
        addMessage(value, "user");
        answerQuestion(value);
        input.value = "";
    }

    launcher.addEventListener("click", () => setOpen(panel.hidden));
    closeButton.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        setOpen(false);
    });
    widget.querySelector(".legacy-kemy-form").addEventListener("submit", (event) => {
        event.preventDefault();
        submit(input.value);
    });
    widget.querySelectorAll("[data-kemy-question]").forEach((button) => {
        button.addEventListener("click", () => submit(button.dataset.kemyQuestion || ""));
    });
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
