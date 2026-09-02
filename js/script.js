const $navbar = document.querySelector(".main-header");
const $toggleMenu = document.getElementById("toggleMenu");

$toggleMenu.addEventListener("click", () => {
    $navbar.classList.toggle("show")
    $toggleMenu.classList.toggle("show")
})

// Para cambiar los colores del widget, se puede modificar el siguiente objeto

const customConfiguration = {
    colors: {
        mainColor: '#D62B5B', // cambia el color del rectangulo del titulo
        secondColor: '#269FAC', // cambia el color del header y footer del del widget
        textColor: '#090305', // cambia el color del texto
        background: '#f4f4f4', // cambia el color del fondo
        backgroundButton: '#f7f7f7', // cambia el color del fondo de los botones
    }
}

const widget = new WAW(customConfiguration);

widget.run();
