// main.js
import { state } from './state.js';
import { attachNavigationListeners } from './ui.js';
import { setLanguage } from './i18n.js';
import { renderProductCards } from './produits.js';
import { renderServiceCards } from './services.js';
import { applyGeneralSettings } from './parametres.js';
import { initParametresPage } from './parametres-page.js';
import { updateCartUI } from './cart.js';

// ==================== LOAD HTML ====================
async function loadHTML(url, containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Erreur chargement ${url}`);
        el.innerHTML = await res.text();
    } catch (err) {
        console.error(err);
        el.innerHTML = `<p style="color:red;">Erreur de chargement</p>`;
    }
}

async function loadHeaderFooter() {
    await Promise.all([
        loadHTML("./header.html", "header-container"),
        loadHTML("./footer.html", "footer-container")
    ]);
}

// ==================== THEME ====================
function initTheme() {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
        document.body.classList.add("dark-theme");
    }
}

function handleThemeToggle() {
    document.body.addEventListener("click", (e) => {
        if (e.target.matches('[data-action="toggle-theme"]')) {
            document.body.classList.toggle("dark-theme");

            const theme = document.body.classList.contains("dark-theme") ? "dark" : "light";
            localStorage.setItem("theme", theme);
        }
    });
}

// ==================== PAGE LOGIC ====================
function loadPage(page) {
    switch (page) {
        case "produits":
            renderProductCards();
            break;

        case "services":
            renderServiceCards();
            break;

        case "parametres":
            initParametresPage();
            break;
    }
}

// ==================== INIT ====================
document.addEventListener("DOMContentLoaded", async () => {
    try {
        // ⚡ Chargement rapide UI de base
        loadHeaderFooter();

        attachNavigationListeners();
        initTheme();
        handleThemeToggle();

        // ⚡ Chargement data en parallèle
        const [translations, config] = await Promise.all([
            fetch("./traduction.json").then(r => r.json()),
            fetch("./data.json").then(r => r.json())
        ]);

        Object.assign(state, {
            translations,
            dataConfig: config
        });

        applyGeneralSettings();
        setLanguage(state.currentLanguage);

        // ⚡ Charger contenu spécifique
        const page = document.body.dataset.page;
        loadPage(page);

        updateCartUI();

    } catch (error) {
        console.error("🔥 ERREUR GLOBALE :", error);

        document.body.innerHTML = `
            <div style="padding:40px;text-align:center;">
                <h1>⚠️ Une erreur est survenue</h1>
                <p>Recharge la page ou réessaie plus tard.</p>
            </div>
        `;
    }
});
