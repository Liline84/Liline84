import { state } from './state.js';

export function renderProductCards() {
    const container = document.querySelector('#products-section .cards-container');
    if (!container) return;

    const products = state.dataConfig.products || [];
    const currency = state.dataConfig.generalSettings?.currentCurrency || '';

    container.innerHTML = products.map(p => `
        <div class="data-card product-card">
            <img src="${p.imagePath}" alt="${p.name}">
            <h3>${p.name}</h3>
            <span>${p.price || 'À confirmer'} ${currency}</span>

            <button class="btn-add-cart"
                data-name="${p.name}"
                data-price="${p.price || 0}">
                Ajouter
            </button>
        </div>
    `).join('');
}
