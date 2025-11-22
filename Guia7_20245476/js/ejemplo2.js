// Obteniendo la referencia de los elementos
// por medio de arreglos asociativos
// aquí se esta utilizando el atributo name de cada elemento
const formulario = document.forms["frmRegistro"];
const button = document.forms["frmRegistro"].elements["btnRegistro"];

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// OBTENIENDO LA REFERENCIA DEL CUERPO DEL MODAL
// PARA IMPRIMIR EL RESULTADO
const bodyModal = document.getElementById("idBodyModal");

// Referencias a los campos del formulario para validación (ejercicio 2)
const inputNombre = document.getElementById("idNombre");
const inputApellidos = document.getElementById("idApellidos");
const inputFechaNac = document.getElementById("idFechaNac");
const inputCorreo = document.getElementById("idCorreo");
const inputPassword = document.getElementById("idPassword");
const inputPasswordRepetir = document.getElementById("idPasswordRepetir");
const idCkProgramacion = document.getElementById("idCkProgramacion");
const idCkBD = document.getElementById("idCkBD");
const idCkRedes = document.getElementById("idCkRedes");
const idCkSeguridad = document.getElementById("idCkSeguridad");
const radioCarreras = document.getElementsByName("idRdCarrera");
const selectPais = document.getElementById("idCmPais");
const inputArchivo = document.getElementById("idArchivo");

// FUNCIONES PARA EL EJERCICIO 2
// Función para validar que un campo no esté vacío
const validarCampoVacio = function(campo) {
  return campo.value.trim() !== "";
};

// Función para validar el email con expresión regular
const validarEmail = function(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
};

// Función para validar que la fecha no supere la actual
const validarFecha = function(fecha) {
  const fechaIngresada = new Date(fecha);
  const fechaActual = new Date();
  fechaActual.setHours(0, 0, 0, 0);
  return fechaIngresada <= fechaActual;
};

// Función para validar que las contraseñas coincidan
const validarPasswordsCoinciden = function() {
  return inputPassword.value === inputPasswordRepetir.value;
};

// Función para validar que al menos un checkbox esté seleccionado
const validarIntereses = function() {
  return idCkProgramacion.checked || idCkBD.checked || idCkRedes.checked || idCkSeguridad.checked;
};

// Función para validar que un radio esté seleccionado
const validarCarrera = function() {
  for (let i = 0; i < radioCarreras.length; i++) {
    if (radioCarreras[i].checked) {
      return true;
    }
  }
  return false;
};

// Función para validar que se haya seleccionado un país
const validarPais = function() {
  return selectPais.selectedIndex !== 0;
};

// Función para obtener la carrera seleccionada
const obtenerCarrera = function() {
  for (let i = 0; i < radioCarreras.length; i++) {
    if (radioCarreras[i].checked) {
      const label = document.querySelector(`label[for="${radioCarreras[i].id}"]`);
      return label.textContent;
    }
  }
  return "";
};

// Función para obtener los intereses seleccionados
const obtenerIntereses = function() {
  let intereses = [];
  
  if (idCkProgramacion.checked) {
    intereses.push("Programación");
  }
  if (idCkBD.checked) {
    intereses.push("Base de Datos");
  }
  if (idCkRedes.checked) {
    intereses.push("Inteligencia Artificial");
  }
  if (idCkSeguridad.checked) {
    intereses.push("Seguridad Informática");
  }
  
  return intereses.join(", ");
};

// Función para validar todo el formulario
const validarFormulario = function() {
  let errores = [];
  
  // a. Validar que los campos no estén vacíos
  if (!validarCampoVacio(inputNombre)) {
    errores.push("El campo Nombres es obligatorio");
  }
  
  if (!validarCampoVacio(inputApellidos)) {
    errores.push("El campo Apellidos es obligatorio");
  }
  
  if (!validarCampoVacio(inputFechaNac)) {
    errores.push("El campo Fecha de Nacimiento es obligatorio");
  }
  
  if (!validarCampoVacio(inputCorreo)) {
    errores.push("El campo Correo Electrónico es obligatorio");
  }
  
  if (!validarCampoVacio(inputPassword)) {
    errores.push("El campo Contraseña es obligatorio");
  }
  
  if (!validarCampoVacio(inputPasswordRepetir)) {
    errores.push("El campo Repetir Contraseña es obligatorio");
  }
  
  // b. Validar que la fecha de nacimiento no supere la fecha actual
  if (validarCampoVacio(inputFechaNac) && !validarFecha(inputFechaNac.value)) {
    errores.push("La fecha de nacimiento no puede ser superior a la fecha actual");
  }
  
  // c. Utilizar expresiones regulares para validar el campo correo electrónico
  if (validarCampoVacio(inputCorreo) && !validarEmail(inputCorreo.value)) {
    errores.push("El formato del correo electrónico es inválido");
  }
  
  // d. Validar que los campos contraseña y repetir contraseña sean iguales
  if (validarCampoVacio(inputPassword) && validarCampoVacio(inputPasswordRepetir)) {
    if (!validarPasswordsCoinciden()) {
      errores.push("Las contraseñas no coinciden");
    }
  }
  
  // e. Verificar que debe estar seleccionada al menos una opción para "algunos intereses"
  if (!validarIntereses()) {
    errores.push("Debe seleccionar al menos un interés");
  }
  
  // f. Verificar que el usuario seleccione una carrera
  if (!validarCarrera()) {
    errores.push("Debe seleccionar una carrera");
  }
  
  // g. Verificar que sea seleccionado un país de origen
  if (!validarPais()) {
    errores.push("Debe seleccionar un país de origen");
  }
  
  return errores;
};

// Función para crear la tabla con DOM
const crearTablaResultados = function() {
  // Crear el elemento tabla
  const tabla = document.createElement("table");
  tabla.setAttribute("class", "table table-striped table-bordered");
  
  // Crear el tbody
  const tbody = document.createElement("tbody");
  
  // Función auxiliar para crear una fila
  const crearFila = function(etiqueta, valor) {
    const tr = document.createElement("tr");
    
    const tdEtiqueta = document.createElement("td");
    tdEtiqueta.setAttribute("class", "fw-bold");
    const textoEtiqueta = document.createTextNode(etiqueta);
    tdEtiqueta.appendChild(textoEtiqueta);
    
    const tdValor = document.createElement("td");
    const textoValor = document.createTextNode(valor);
    tdValor.appendChild(textoValor);
    
    tr.appendChild(tdEtiqueta);
    tr.appendChild(tdValor);
    
    return tr;
  };
  
  // Agregar las filas con los datos
  tbody.appendChild(crearFila("Nombres:", inputNombre.value));
  tbody.appendChild(crearFila("Apellidos:", inputApellidos.value));
  tbody.appendChild(crearFila("Fecha de Nacimiento:", inputFechaNac.value));
  tbody.appendChild(crearFila("Correo Electrónico:", inputCorreo.value));
  tbody.appendChild(crearFila("Intereses:", obtenerIntereses()));
  tbody.appendChild(crearFila("Carrera:", obtenerCarrera()));
  
  // Obtener el texto del país seleccionado
  const paisTexto = selectPais.options[selectPais.selectedIndex].text;
  tbody.appendChild(crearFila("País de Origen:", paisTexto));

  // Agregar fila con avatar solo si hay archivo seleccionado
  if (inputArchivo.files.length > 0) {
    const archivo = inputArchivo.files[0];
    
    const tr = document.createElement("tr");
    
    const tdEtiqueta = document.createElement("td");
    tdEtiqueta.setAttribute("class", "fw-bold");
    const textoEtiqueta = document.createTextNode("Avatar:");
    tdEtiqueta.appendChild(textoEtiqueta);
    
    const tdValor = document.createElement("td");
    
    // Crear el elemento de la imagen
    const img = document.createElement("img");
    img.setAttribute("class", "img-thumbnail");
    img.setAttribute("style", "max-width: 200px; max-height: 200px;");
    img.setAttribute("alt", "Avatar del usuario");
    
    // Crear la URL temporal para mostrar la imagen
    const urlImagen = URL.createObjectURL(archivo);
    img.setAttribute("src", urlImagen);
    
    tdValor.appendChild(img);

    tr.appendChild(tdEtiqueta);
    tr.appendChild(tdValor);
    
    tbody.appendChild(tr); 
  }

  // Agregar el tbody a la tabla
  tabla.appendChild(tbody);
  
  return tabla;
};

// Función principal para validar y mostrar resultados
const recorrerFormulario = function () {
  // Ejecutar las validaciones
  const errores = validarFormulario();
  
  // Limpiar el contenido previo del modal
  bodyModal.innerHTML = "";
  
  // Si hay errores, mostrarlos
  if (errores.length > 0) {
    const tituloError = document.createElement("h5");
    tituloError.setAttribute("class", "text-danger");
    const textoTitulo = document.createTextNode("Errores encontrados:");
    tituloError.appendChild(textoTitulo);
    bodyModal.appendChild(tituloError);
    
    const listaErrores = document.createElement("ul");
    listaErrores.setAttribute("class", "list-group");
    
    for (let i = 0; i < errores.length; i++) {
      const itemError = document.createElement("li");
      itemError.setAttribute("class", "list-group-item list-group-item-danger");
      const textoError = document.createTextNode(errores[i]);
      itemError.appendChild(textoError);
      listaErrores.appendChild(itemError);
    }
    
    bodyModal.appendChild(listaErrores);
  } else {
    // Si no hay errores, mostrar la tabla con los datos
    const tituloExito = document.createElement("h5");
    tituloExito.setAttribute("class", "text-success mb-3");
    const textoExito = document.createTextNode("Datos del Registro:");
    tituloExito.appendChild(textoExito);
    bodyModal.appendChild(tituloExito);
    
    const tabla = crearTablaResultados();
    bodyModal.appendChild(tabla);
  }
  
  // Mostrar el modal
  modal.show();
};

// Agregando evento al botón
button.onclick = () => {
  recorrerFormulario();
};