import { state } from './state.js';

export function renderServiceCards() {
    const container = document.querySelector('#services-section .cards-container');
    if (!container) return;

    const services = state.dataConfig.services || [];
    const currency = state.dataConfig.generalSettings?.currentCurrency || '';

    container.innerHTML = services.map(s => `
        <div class="data-card service-card">
            <h3>${s.title}</h3>
            <p>${s.details}</p>
            <span>${s.price} ${currency}</span>

            <button class="btn-add-cart"
                data-name="${s.title}"
                data-price="${s.price}">
                Réserver
            </button>
        </div>
    `).join('');
}
