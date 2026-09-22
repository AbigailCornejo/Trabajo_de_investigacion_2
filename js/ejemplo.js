// ==========================================
// ELEMENTOS DEL HTML
// ==========================================

const opciones =
    document.querySelectorAll('input[name="tipoValidacion"]');

const dato =
    document.getElementById("dato");

const btnValidar =
    document.getElementById("btnValidar");

const btnLimpiar =
    document.getElementById("btnLimpiar");

const resultado =
    document.getElementById("resultado");

const iconoTipo =
    document.getElementById("iconoTipo");

const tituloTipo =
    document.getElementById("tituloTipo");

const descripcionTipo =
    document.getElementById("descripcionTipo");

const labelDato =
    document.getElementById("labelDato");

const informacionRegex =
    document.getElementById("informacionRegex");

const regexMostrada =
    document.getElementById("regexMostrada");

const explicacionRegex =
    document.getElementById("explicacionRegex");


// ==========================================
// INFORMACIÓN DE CADA VALIDACIÓN
// ==========================================

const validaciones = {

    correo: {

        icono: "📧",

        titulo: "Correo electrónico",

        descripcion:
            "Comprueba si el correo tiene un formato válido.",

        label:
            "Escribe tu correo electrónico",

        placeholder:
            "ejemplo@gmail.com",

        regex:
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

        regexTexto:
            "/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/",

        explicacion:
            "Comprueba que exista texto antes y después del símbolo @ y que exista un punto en el dominio.",

        tipoInput:
            "email"

    },


    telefono: {

        icono: "📱",

        titulo: "Número telefónico",

        descripcion:
            "Comprueba un número utilizando el formato 0000-0000.",

        label:
            "Escribe tu número telefónico",

        placeholder:
            "0000-0000",

        regex:
            /^[0-9]{4}-[0-9]{4}$/,

        regexTexto:
            "/^[0-9]{4}-[0-9]{4}$/",

        explicacion:
            "Comprueba que el número tenga exactamente cuatro dígitos, un guion y otros cuatro dígitos.",

        tipoInput:
            "text"

    },


    usuario: {

        icono: "👤",

        titulo: "Nombre de usuario",

        descripcion:
            "Permite letras, números y guion bajo entre 4 y 15 caracteres.",

        label:
            "Escribe tu nombre de usuario",

        placeholder:
            "usuario_123",

        regex:
            /^[a-zA-Z0-9_]{4,15}$/,

        regexTexto:
            "/^[a-zA-Z0-9_]{4,15}$/",

        explicacion:
            "Permite letras mayúsculas y minúsculas, números y guion bajo. El nombre debe tener entre 4 y 15 caracteres.",

        tipoInput:
            "text"

    },


    password: {

        icono: "🔐",

        titulo: "Contraseña",

        descripcion:
            "Debe tener mínimo 8 caracteres, una mayúscula, una minúscula y un número.",

        label:
            "Escribe tu contraseña",

        placeholder:
            "Ejemplo123",

        regex:
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,

        regexTexto:
            "/^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$/",

        explicacion:
            "Comprueba que la contraseña tenga como mínimo 8 caracteres, una letra minúscula, una mayúscula y un número.",

        tipoInput:
            "password"

    }

};


// ==========================================
// CUANDO EL USUARIO SELECCIONA UNA OPCIÓN
// ==========================================

opciones.forEach(function(opcion) {

    opcion.addEventListener("change", function() {

        cambiarValidador(this.value);

    });

});


// ==========================================
// CAMBIAR EL VALIDADOR
// ==========================================

function cambiarValidador(tipo) {

    const informacion =
        validaciones[tipo];


    // Cambiar icono

    iconoTipo.textContent =
        informacion.icono;


    // Cambiar título

    tituloTipo.textContent =
        informacion.titulo;


    // Cambiar descripción

    descripcionTipo.textContent =
        informacion.descripcion;


    // Cambiar etiqueta

    labelDato.textContent =
        informacion.label;


    // Cambiar placeholder

    dato.placeholder =
        informacion.placeholder;


    // Cambiar tipo del input

    dato.type =
        informacion.tipoInput;


    // Activar input

    dato.disabled = false;


    // Activar botón

    btnValidar.disabled = false;


    // Mostrar expresión regular

    informacionRegex.style.display =
        "block";


    regexMostrada.textContent =
        informacion.regexTexto;


    explicacionRegex.textContent =
        informacion.explicacion;


    // Limpiar resultados anteriores

    limpiarResultado();

}


// ==========================================
// BOTÓN VALIDAR
// ==========================================

btnValidar.addEventListener("click", function() {

    // Buscar qué opción está seleccionada

    const opcionSeleccionada =
        document.querySelector(
            'input[name="tipoValidacion"]:checked'
        );


    if (!opcionSeleccionada) {

        mostrarResultado(
            "Selecciona primero qué deseas validar.",
            false
        );

        return;

    }


    const tipo =
        opcionSeleccionada.value;


    const informacion =
        validaciones[tipo];


    const valor =
        dato.value.trim();


    // Comprobar que exista información

    if (valor === "") {

        mostrarResultado(
            "Escribe un dato para poder validarlo.",
            false
        );

        return;

    }


    // ======================================
    // UTILIZAR LA EXPRESIÓN REGULAR
    // ======================================

    const esValido =
        informacion.regex.test(valor);


    // Mostrar resultado

    if (esValido) {

        mostrarResultado(
            "✓ El dato ingresado es válido.",
            true
        );

    } else {

        mostrarResultado(
            "✗ El dato ingresado no cumple con el formato esperado.",
            false
        );

    }

});


// ==========================================
// MOSTRAR RESULTADO
// ==========================================

function mostrarResultado(mensaje, correcto) {

    resultado.textContent =
        mensaje;


    if (correcto) {

        resultado.className =
            "resultado exito mt-4";

    } else {

        resultado.className =
            "resultado error mt-4";

    }

}


// ==========================================
// BOTÓN LIMPIAR
// ==========================================

btnLimpiar.addEventListener("click", function() {

    dato.value = "";

    limpiarResultado();

});


// ==========================================
// LIMPIAR RESULTADO
// ==========================================

function limpiarResultado() {

    resultado.textContent = "";

    resultado.className =
        "resultado";

}
