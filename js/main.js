// main.js
import { state } from './state.js';
import { attachNavigationListeners } from './ui.js';
import { setLanguage } from './i18n.js';
import { renderProductCards } from './produits.js';
import { renderServiceCards } from './services.js';
import { applyGeneralSettings } from './parametres.js';
import { initParametresPage } from './parametres-page.js';

async function loadHTML(url, containerId) {
    const el = document.getElementById(containerId);
    if (!el) return;

    const html = await fetch(url).then(res => res.text());
    el.innerHTML = html;
}

export async function loadHeaderFooter() {
    await Promise.all([
        loadHTML("/header.html", "header-container"),
        loadHTML("/footer.html", "footer-container")
    ]);
}

function initTheme() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
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

function loadPageSpecificJS(page) {
    switch (page) {
        case 'produits':
            renderProductCards();
            break;
        case 'services':
            renderServiceCards();
            break;
        case 'parametres':
            initParametresPage();
            break;
        default:
            // home ou autres
            break;
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        await loadHeaderFooter();

        const [translations, config] = await Promise.all([
            fetch("/traduction.json").then(res => res.json()),
            fetch("/data.json").then(res => res.json())
        ]);

        Object.assign(state, {
            translations,
            dataConfig: config
        });

        applyGeneralSettings();
        setLanguage(state.currentLanguage);

        initTheme();
        handleThemeToggle();

        attachNavigationListeners();

        const page = document.body.dataset.page;
        loadPageSpecificJS(page);

    } catch (error) {
        console.error("🔥 ERREUR :", error);
    }
});
