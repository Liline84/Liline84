import { state } from './state.js';

export function setLanguage(lang) {
    state.currentLanguage = lang;
    localStorage.setItem('lang', lang);

    document.documentElement.setAttribute('lang', lang);

    const trans = state.translations[lang] || state.translations.fr;

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;

        if (trans[key]) {
            let text = trans[key];

            const settings = state.dataConfig.generalSettings || {};

            text = text
                .replace('[YEAR]', settings.copyrightYear || new Date().getFullYear())
                .replace('[SITE_NAME]', settings.siteName || 'PAULYON')
                .replace('[EMAIL]', settings.emailContact || '');

            el.innerHTML = text;
        }
    });
}
