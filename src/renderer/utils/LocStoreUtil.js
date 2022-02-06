export function resetApp() {
    localStorage.clear();
}

export function setTheme(isLightTheme) {
    localStorage.setItem("theme_preference", isLightTheme);
    return isLightTheme === "true";
}

export function getTheme() {
    const isLightTheme = localStorage.getItem("theme_preference");
    if (isLightTheme === "true") {
        return true;
    }
    if (isLightTheme === "false") {
        return false;
    }
    return isLightTheme;
}