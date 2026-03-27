// cart.js
import { state } from './state.js';

export function addToCart(name, price) {
    const parsedPrice = Number(price) || 0;

    state.cart.push({
        name,
        price: parsedPrice
    });

    updateCartUI?.(); // safe call
}

export function orderWhatsApp() {
    const settings = state.dataConfig.generalSettings || {};
    const devise = settings.currentCurrency || '';

    const total = state.cart.reduce((sum, item) => sum + item.price, 0);

    const items = state.cart.map(i => {
        const prix = i.price ? `${i.price} ${devise}` : "Prix à confirmer";
        return `▪️ ${i.name} - ${prix}`;
    }).join("\n");

    const message = encodeURIComponent(
`Bonjour PAULYON ! 👋
Je souhaite commander :

${items}

Total : ${total} ${devise}`
    );

    const cleanNumber = (settings.whatsappNumber || '').replace(/[\s+-]/g, '');
    window.open(`https://wa.me/${cleanNumber}?text=${message}`);
}
