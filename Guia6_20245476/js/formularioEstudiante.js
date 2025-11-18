//Accediendo a los elementos HTML
const inputCarnet = document.getElementById("idCarnet");
const inputNombreCompleto = document.getElementById("idNombreCompleto");
const inputDUI = document.getElementById("idDUI");
const inputNIT = document.getElementById("idNIT");
const inputFechaNacimiento = document.getElementById("idFechaNacimiento");
const inputEdad = document.getElementById("idEdad");
const inputCorreo = document.getElementById("idCorreo");

const btnValidar = document.getElementById("idBtnValidar");
const btnLimpiar = document.getElementById("idBtnLimpiar");
const divResultado = document.getElementById("idResultado");

//Elementos para mostrar errores
const errorCarnet = document.getElementById("errorCarnet");
const errorNombre = document.getElementById("errorNombre");
const errorDUI = document.getElementById("errorDUI");
const errorNIT = document.getElementById("errorNIT");
const errorFecha = document.getElementById("errorFecha");
const errorEdad = document.getElementById("errorEdad");
const errorCorreo = document.getElementById("errorCorreo");

//Componente toast de Bootstrap
const notificacion = document.getElementById("idNotificacion");
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

/*
Expresiones regulares para validación
*/
const regexCarnet = /^[A-Z]{2}\d{3}$/; //AB001
const regexNombre = /^[a-záéíóúñ\s]+$/i; //Solo letras y espacios
const regexDUI = /^\d{8}-\d{1}$/; //12345678-9
const regexNIT = /^\d{4}-\d{6}-\d{3}-\d{1}$/; //1234-567890-123-4
const regexFecha = /^(0[1-9]|[12]\d|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/; //DD/MM/AAAA
const regexEdad = /^\d+$/; //Solo números
const regexCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; //usuario@dominio.extención

/*
Función para limpiar todos los campos
*/
const limpiarFormulario = () => {
    inputCarnet.value = "";
    inputNombreCompleto.value = "";
    inputDUI.value = "";
    inputNIT.value = "";
    inputFechaNacimiento.value = "";
    inputEdad.value = "";
    inputCorreo.value = "";
    
    //Limpiar mensajes de error
    errorCarnet.textContent = "";
    errorNombre.textContent = "";
    errorDUI.textContent = "";
    errorNIT.textContent = "";
    errorFecha.textContent = "";
    errorEdad.textContent = "";
    errorCorreo.textContent = "";
    
    //Limpiar resultado
    divResultado.innerHTML = `<div class="alert alert-info" role="alert">
        Completa y valida el formulario para ver los resultados
    </div>`;
    
    //Limpiar estilos de los inputs
    inputCarnet.classList.remove("is-valid", "is-invalid");
    inputNombreCompleto.classList.remove("is-valid", "is-invalid");
    inputDUI.classList.remove("is-valid", "is-invalid");
    inputNIT.classList.remove("is-valid", "is-invalid");
    inputFechaNacimiento.classList.remove("is-valid", "is-invalid");
    inputEdad.classList.remove("is-valid", "is-invalid");
    inputCorreo.classList.remove("is-valid", "is-invalid");
    
    inputCarnet.focus();
};

/*
Función para validar cada campo individualmente
*/
const validarCampo = (valor, regex, inputElement, errorElement, nombreCampo) => {
    if (valor === "") {
        errorElement.textContent = `El campo ${nombreCampo} es obligatorio`;
        inputElement.classList.remove("is-valid");
        inputElement.classList.add("is-invalid");
        return false;
    }
    
    if (regex.test(valor)) {
        errorElement.textContent = "";
        inputElement.classList.remove("is-invalid");
        inputElement.classList.add("is-valid");
        return true;
    } else {
        errorElement.textContent = `El formato de ${nombreCampo} no es válido`;
        inputElement.classList.remove("is-valid");
        inputElement.classList.add("is-invalid");
        return false;
    }
};

/*
Función para validar todo el formulario
*/
const validarFormulario = () => {
    //Guardar resultados de cada validación
    const carnetValido = validarCampo(
        inputCarnet.value,
        regexCarnet,
        inputCarnet,
        errorCarnet,
        "Carnet"
    );
    
    const nombreValido = validarCampo(
        inputNombreCompleto.value,
        regexNombre,
        inputNombreCompleto,
        errorNombre,
        "Nombre completo"
    );
    
    const duiValido = validarCampo(
        inputDUI.value,
        regexDUI,
        inputDUI,
        errorDUI,
        "Número de DUI"
    );
    
    const nitValido = validarCampo(
        inputNIT.value,
        regexNIT,
        inputNIT,
        errorNIT,
        "Número de NIT"
    );
    
    const fechaValida = validarCampo(
        inputFechaNacimiento.value,
        regexFecha,
        inputFechaNacimiento,
        errorFecha,
        "Fecha de nacimiento"
    );
    
    const edadValida = validarCampo(
        inputEdad.value,
        regexEdad,
        inputEdad,
        errorEdad,
        "Edad"
    );
    
    const correoValido = validarCampo(
        inputCorreo.value,
        regexCorreo,
        inputCorreo,
        errorCorreo,
        "Correo electrónico"
    );
    
    //Verificar si todos los campos son válidos
    if (carnetValido && nombreValido && duiValido && nitValido && fechaValida && edadValida && correoValido) {
        mostrarResultadoExitoso();
        mensaje.innerHTML = "Formulario válido";
        toast.show();
        return true;
    } else {
        mostrarResultadoError();
        mensaje.innerHTML = "Por favor, corrija los campos con error";
        notificacion.classList.remove("text-bg-success");
        notificacion.classList.add("text-bg-danger");
        toast.show();
        return false;
    }
};

/*
Función para mostrar resultado exitoso
*/
const mostrarResultadoExitoso = () => {
    const html = `
        <div class="alert alert-success" role="alert">
            <h5 class="alert-heading">Validación exitosa</h5>
            <hr>
            <p><strong>Carnet:</strong> ${inputCarnet.value}</p>
            <p><strong>Nombre completo:</strong> ${inputNombreCompleto.value}</p>
            <p><strong>Número de DUI:</strong> ${inputDUI.value}</p>
            <p><strong>Número de NIT:</strong> ${inputNIT.value}</p>
            <p><strong>Fecha de nacimiento:</strong> ${inputFechaNacimiento.value}</p>
            <p><strong>Edad:</strong> ${inputEdad.value} años</p>
            <p><strong>Correo electrónico:</strong> ${inputCorreo.value}</p>
        </div>
    `;
    divResultado.innerHTML = html;
};

/*
Función para mostrar resultado con error
*/
const mostrarResultadoError = () => {
    const html = `
        <div class="alert alert-danger" role="alert">
            <h5 class="alert-heading">Errores en la validación</h5>
            <hr>
            <p>Por favor, revise los campos marcados en rojo y corrija los errores</p>
        </div>
    `;
    divResultado.innerHTML = html;
};

//Agregar eventos a los botones
btnValidar.addEventListener("click", () => {
    validarFormulario();
});

btnLimpiar.addEventListener("click", () => {
    limpiarFormulario();
});

//Al cargar la página, limpiar el formulario
window.addEventListener("load", () => {
    limpiarFormulario();
});