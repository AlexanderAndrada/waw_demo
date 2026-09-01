/**
 * Funcion que setea los colores al widget.
 * 
 *  -> Se aplican unicamente si el cliente los envia
 *  -> Si el cliente no los envia se aplica los estilos que están en style.css :root
 * 
 * @param {*} colors 
 */
export const setColors = (colors = {}) => {
    if (colors) {
        // Modo claro
        if (colors.mainColor) {
            document.documentElement.style.setProperty('--main-color', colors.mainColor);
        }
        if (colors.secondColor) {
            document.documentElement.style.setProperty('--second-color', colors.secondColor);
        }
        if (colors.textColor) {
            document.documentElement.style.setProperty('--text-color', colors.textColor);
        }
        if (colors.background) {
            document.documentElement.style.setProperty('--background', colors.background);
        }
        if (colors.backgroundButton) {
            document.documentElement.style.setProperty('--background-button', colors.backgroundButton);
        }

        // Modo oscuro
        if (colors.mainColorDarkMode) {
            document.documentElement.style.setProperty('--main-color-dark', colors.mainColorDarkMode);
        }
        if (colors.secondColorDarkMode) {
            document.documentElement.style.setProperty('--second-color-dark', colors.secondColorDarkMode);
        }
        if (colors.textColorDarkMode) {
            document.documentElement.style.setProperty('--text-color-dark', colors.textColorDarkMode);
        }
        if (colors.backgroundDarkMode) {
            document.documentElement.style.setProperty('--background-dark', colors.backgroundDarkMode);
        }
        if (colors.backgroundButtonDarkMode) {
            document.documentElement.style.setProperty('--background-button-dark', colors.backgroundButtonDarkMode);
        }
    }
}