// ui.js
export function toggleSidebar() {
    const nav = document.getElementById("main-nav");
    const overlay = document.getElementById("overlay");

    nav?.classList.toggle("active");
    overlay?.classList.toggle("visible");
}

export function closeAllMenus() {
    document.getElementById("main-nav")?.classList.remove("active");
    document.getElementById("overlay")?.classList.remove("visible");
}

export function attachNavigationListeners() {
    document.getElementById("hamburger-btn")
        ?.addEventListener("click", toggleSidebar);

    document.getElementById("overlay")
        ?.addEventListener("click", closeAllMenus);
}
