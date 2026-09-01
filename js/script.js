const $navbar = document.querySelector(".main-header");
const $toggleMenu = document.getElementById("toggleMenu");

$toggleMenu.addEventListener("click", () => {
    $navbar.classList.toggle("show")
    $toggleMenu.classList.toggle("show")
})

const customConfiguration = {
    colors: {
        mainColor: '#262B5B', // cambia el color del rectangulo del titulo
        secondColor: '#269FAC', // cambia el color del header y footer del del widget
        textColor: '#090305', // cambia el color del texto
        background: '#f4f4f4', // cambia el color del fondo
        backgroundButton: '#f7f7f7', // cambia el color del fondo de los botones
        mainColorDarkMode: '#b7234d', // cambia el color del rectangulo del titulo en modo oscuro
        secondColorDarkMode: '#1c7680', // cambia el color del header y footer del del widget en modo oscuro
        textColorDarkMode: '#e0e0e0', // cambia el color del texto en modo oscuro
        backgroundDarkMode: '#2b2b2b', // cambia el color del fondo en modo oscuro
        backgroundButtonDarkMode: '#333333' // cambia el color del fondo de los botones en modo oscuro
    }
}

const widget = new WAW(customConfiguration);

widget.run();
