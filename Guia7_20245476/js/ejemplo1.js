// ACCEDIENDO A LA REFERENCIA DEL FORMULARIO QUE
// TENDRÁ LOS NUEVOS ELEMENTOS
const newForm = document.getElementById("idNewForm");

// ACCEDIENDO A LA REFERENCIA DE BOTONES
const buttonCrear = document.getElementById("idBtnCrear");
const buttonAddElemento = document.getElementById("idBtnAddElemento");
const buttonValidar = document.getElementById("idBtnValidar"); // Ejercicio 1

// ACCEDIENDO AL VALOR DEL SELECT PARA DETERMINAR EL TIPO DE ELEMENTO A CREAR
const cmbElemento = document.getElementById("idCmbElemento");

// ACCEDIENDO A LOS CONTROLES DEL MODAL
const tituloElemento = document.getElementById("idTituloElemento");
const nombreElemento = document.getElementById("idNombreElemento");

// Accediendo al mensaje de validación (ejercicio 1)
const mensajeValidacion = document.getElementById("idMensajeValidacion");

// Array para almacenar los IDs existentes (ejercicio 1)
let idsExistentes = [];

// CREANDO MODAL CON BOOTSTRAP
const modal = new bootstrap.Modal(document.getElementById("idModal"), {});

// AGREGANDO FUNCIONES PARA EL EJERCICIO 1
// Función para verificar si el ID ya existe
const verificarIdUnico = function(id) {
  return !idsExistentes.includes(id);
};

// Función para mostrar los mensajes
const mostrarMensaje = function(mensaje, tipo) {
  mensajeValidacion.textContent = mensaje;
  mensajeValidacion.className = `alert alert-${tipo}`;
  mensajeValidacion.classList.remove('d-none');
};

// AGREGANDO FUNCIONES
const verificarTipoElemento = function () {
  let elemento = cmbElemento.value;
  //validando que se haya seleccionado un elemento
  if (elemento != "") {
    // Método perteneciente al modal de bootstrap
    modal.show();
  } else {
    alert("Debe seleccionar el elemento que se creará");
  }
};

const newSelect = function () {
  // Creando elementos
  let addElemento = document.createElement("select");
  //creando atributos para el nueveo elemento
  addElemento.setAttribute("id", `id${nombreElemento.value}`);
  addElemento.setAttribute("class", "form-select");

  //creando option para el select
  for (let i = 1; i <= 10; i++) {
    let addOption = document.createElement("option");
    addOption.value = i;
    addOption.innerHTML = `Opción ${i}`;
    addElemento.appendChild(addOption);
  }

  //creando label para el nuevo control
  let labelElemento = document.createElement("label");
  labelElemento.setAttribute("class", "form-check-label");
  labelElemento.setAttribute("for", `id${nombreElemento.value}`);
  //creando texto para label
  labelElemento.textContent = tituloElemento.value;

  //Creando label de id
  let labelId = document.createElement("span");
  labelId.textContent = `ID de control : ${nombreElemento.value}`;

  // Creando plantilla de bootstrap para visualizar el nuevo elemento
  let divElemento = document.createElement("div");
  // Agregando atributos
  divElemento.setAttribute("class", "form-floating");

  //Creando el input que sera hijo del div
  divElemento.appendChild(addElemento);
  //Creando el label que sera hijo del div
  divElemento.appendChild(labelElemento);

  //Creando el SPAN que sera hijo del nuevo Formulario
  newForm.appendChild(labelId);

  //Creando el Div que sera hijo del nuevo Formulario
  newForm.appendChild(divElemento);
};

const newRadioCheckbox = function (newElemento) {
  // Creando elementos
  let addElemento = document.createElement("input");
  //creando atributos para el nuevo elemento
  addElemento.setAttribute("id", `id${nombreElemento.value}`);
  addElemento.setAttribute("type", newElemento);
  addElemento.setAttribute("class", "form-check-input");

  //creando label para el nuevo control
  let labelElemento = document.createElement("label");
  labelElemento.setAttribute("class", "form-check-label");
  labelElemento.setAttribute("for", `id${nombreElemento.value}`);
  //creando texto para label
  labelElemento.textContent = tituloElemento.value;

  //Creando label de id
  let labelId = document.createElement("span");
  labelId.textContent = `ID de control : ${nombreElemento.value}`;

  // Creando plantilla de bootstrap para visualizar el nuevo elemento
  let divElemento = document.createElement("div");
  // Agregando atributos
  divElemento.setAttribute("class", "form-check");

  //Creando el input que sera hijo del div
  divElemento.appendChild(addElemento);
  //Creando el label que sera hijo del div
  divElemento.appendChild(labelElemento);

  //Creando el SPAN que sera hijo del nuevo Formulario
  newForm.appendChild(labelId);

  //Creando el Div que sera hijo del nuevo Formulario
  newForm.appendChild(divElemento);
};

const newInput = function (newElemento) {
  // Creando elementos de tipo - text, number, date y password
  let addElemento =
    newElemento == "textarea"
      ? document.createElement("textarea")
      : document.createElement("input");

  //creando atributos para el nuevo elemento
  addElemento.setAttribute("id", `id${nombreElemento.value}`);
  addElemento.setAttribute("type", newElemento);
  addElemento.setAttribute("class", "form-control");
  addElemento.setAttribute("placeholder", tituloElemento.value);

  //creando label para el nuevo control
  let labelElemento = document.createElement("label");
  labelElemento.setAttribute("class", "form-check-label");
  labelElemento.setAttribute("for", `id${nombreElemento.value}`);
  labelElemento.textContent = tituloElemento.value;

  //creando icono para el label
  let iconLabel = document.createElement("i");
  iconLabel.setAttribute("class", "bi bi-tag");

  //creando texto para label
  labelElemento.textContent = tituloElemento.value;

  //creando el elemento i como hijo del label, afterbegin le
  // indicamos que se creará antes de su primer hijo
  labelElemento.insertAdjacentElement("afterbegin", iconLabel);

  //Creando label de id
  let labelId = document.createElement("span");
  labelId.textContent = `ID de control : ${nombreElemento.value}`;

  // Creando plantilla de bootstrap para visualizar el nuevo elemento
  let divElemento = document.createElement("div");
  // Agregando atributos
  divElemento.setAttribute("class", "form-floating mb-3");

  //Creando el input que sera hijo del div
  divElemento.appendChild(addElemento);
  //Creando el label que sera hijo del div
  divElemento.appendChild(labelElemento);

  //Creando el SPAN que sera hijo del nuevo Formulario
  newForm.appendChild(labelId);

  //Creando el Div que sera hijo del nuevo Formulario
  newForm.appendChild(divElemento);
};

// AGREGANDO EVENTO CLIC A LOS BOTONES
buttonCrear.onclick = () => {
  verificarTipoElemento();
};

buttonAddElemento.onclick = () => {
  if (nombreElemento.value != "" && tituloElemento.value != "") {
    // Validar que el ID no exista (ejercicio 1)
    if (!verificarIdUnico(nombreElemento.value)) {
      mostrarMensaje(`Error: Ya existe un control con el ID "${nombreElemento.value}". Por favor, use un ID distinto`, 'danger');
      return;
    }

    let elemento = cmbElemento.value;

    if (elemento == "select") {
      newSelect();
    } else if (elemento == "radio" || elemento == "checkbox") {
      newRadioCheckbox(elemento);
    } else {
      newInput(elemento);
    }

    // Agregar el nuevo ID al array de IDs existentes (ejercicio 1)
    idsExistentes.push(nombreElemento.value);
    mostrarMensaje(`El control con ID "${nombreElemento.value}" se ha agregado correctamente`, 'success');
  } else {
    alert("Faltan campos por completar");
  }
};

// Función para validar el formulario (ejercicio 1)
const validarFormulario = function() {
  let elementos = newForm.querySelectorAll('input, select, textarea');
  let errores = [];
  let elementosVacios = [];
  
  elementos.forEach(elemento => {
    let id = elemento.id;
    let tipo = elemento.type;
    
    // Validar los campos de texto, número, fecha, password, email, color
    if (tipo === 'text' || tipo === 'date' || tipo === 'password' 
      || tipo === 'email' || tipo === 'color' || elemento.tagName === 'TEXTAREA') {
      if (elemento.value.trim() === '') {
        elementosVacios.push(id);
      }
    }

    // Validar el número
    if (tipo === 'number') {
      if (elemento.value === '') {
          // Verificar si el campo realmente está vacío o tiene texto inválido
          if (elemento.validity.badInput) {
              errores.push(`${id} -> debe ingresar solo números`);
          } else {
              elementosVacios.push(id);
          }
      }
    }
  
    // Validar el email
    if (tipo === 'email' && elemento.value !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(elemento.value)) {
        errores.push(`${id} -> email inválido`);
      }
    }
    
    // Validar el select
    if (elemento.tagName === 'SELECT') {
      if (elemento.value === '') {
        elementosVacios.push(id);
      }
    }
  });
  
  // Validar los radio buttons (al menos uno debe estar seleccionado)
  let radios = newForm.querySelectorAll('input[type="radio"]');
  if (radios.length > 0) {
    let algunRadioSeleccionado = false;
    radios.forEach(radio => {
      if (radio.checked) {
        algunRadioSeleccionado = true;
      }
    });
    
    if (!algunRadioSeleccionado) {
      elementosVacios.push('al menos un radio button debe estar seleccionado');
    }
  }
  
  // Validar los checkboxes (al menos uno debe estar marcado)
  let checkboxes = newForm.querySelectorAll('input[type="checkbox"]');
  let algunCheckboxMarcado = false;
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      algunCheckboxMarcado = true;
    }
  });
  
  if (checkboxes.length > 0 && !algunCheckboxMarcado) {
    elementosVacios.push('al menos un checkbox debe estar marcado');
  }
  
  // Mostrar los resultados
  if (elementos.length === 0) {
    mostrarMensaje('No hay elementos en el formulario para validar', 'warning');
  } else if (elementosVacios.length > 0 || errores.length > 0) {
    let mensaje = 'Errores de validación:\n';
    if (elementosVacios.length > 0) {
      mensaje += 'Campos vacíos: ' + elementosVacios.join(', ') + '\n';
    }
    if (errores.length > 0) {
      mensaje += 'Otros errores: ' + errores.join(', ');
    }
    mostrarMensaje(mensaje, 'danger');
  } else {
    mostrarMensaje('El formulario es válido. Todos los campos están completos y correctos.', 'success');
  }
};

// Agregar evento al botón de validar
buttonValidar.onclick = () => {
  validarFormulario();
};

// Agregue la siguiente función para limpiar el formulario creado por el MODAL de Bootstrap.
document.getElementById("idModal").addEventListener("shown.bs.modal", () => {
  // Limpiando campos para los nuevos elementos
  tituloElemento.value = "";
  nombreElemento.value = "";
  // inicializando puntero en el campo del título para el control
  tituloElemento.focus();
});