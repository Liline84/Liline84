// parametres-page.js
import { setLanguage } from './i18n.js';

export function initParametresPage() {

    document.querySelectorAll('[data-action="change-lang"]').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            setLanguage(lang);
        });
    });

}
