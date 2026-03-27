import { state } from './state.js';
import { attachNavigationListeners } from './ui.js';
import { setLanguage } from './i18n.js';
import { renderProductCards } from './produits.js';
import { renderServiceCards } from './services.js';
import { applyGeneralSettings } from './parametres.js';
import { addToCart } from './cart.js';

document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Charger header + footer (chemins RELATIFS)
        const loadHTML = async (file, id) => {
            const res = await fetch(file);
            const html = await res.text();
            document.getElementById(id).innerHTML = html;
        };

        await Promise.all([
            loadHTML("header.html", "header-container"),
            loadHTML("footer.html", "footer-container")
        ]);

        // Charger JSON
        const [translations, config] = await Promise.all([
            fetch("traduction.json").then(r => r.json()),
            fetch("data.json").then(r => r.json())
        ]);

        Object.assign(state, {
            translations,
            dataConfig: config
        });

        // Initialisation
        applyGeneralSettings();
        setLanguage(state.currentLanguage);

        // Render
        renderProductCards();
        renderServiceCards();

        // UI
        attachNavigationListeners();

        // 🛒 EVENT GLOBAL (IMPORTANT)
        document.body.addEventListener("click", (e) => {
            if (e.target.closest(".btn-add-cart")) {
                const btn = e.target.closest(".btn-add-cart");
                addToCart(btn.dataset.name, btn.dataset.price);
            }
        });

    } catch (err) {
        console.error("🔥 ERREUR :", err);
    }
});
