//Accediendo a los elementos html
const inputNombre = document.getElementById("idTxtNombre");
const inputApellido = document.getElementById("idTxtApellido");
const inputFechaNacimiento = document.getElementById("idTxtFechaNacimiento");
const inputRdMasculino = document.getElementById("idRdMasculino");
const inputRdFemenino = document.getElementById("idRdFemenino");
const cmbPais = document.getElementById("idCmbPais");
const inputDireccion = document.getElementById("idTxtDireccion");
const inputNombrePais = document.getElementById("idNombrePais");

const buttonAgregarPaciente = document.getElementById("idBtnAgregar");
const buttonLimpiarPaciente = document.getElementById("idBtnLimpiar");
const buttonMostrarPaciente = document.getElementById("idBtnMostrar");
const buttonAgregarPais = document.getElementById("idBtnAddPais");

const notificacion = document.getElementById("idNotificacion");
//Componente de Bootstrap
const toast = new bootstrap.Toast(notificacion);
const mensaje = document.getElementById("idMensaje");

//Componente modal
const idModal = document.getElementById("idModal");

//Arreglo global de pacientes
let arrayPaciente = [];
// Ejercicio 1: variable para controlar si se está editando
let indexPacienteEditado = -1;

/*
Creando una función para que limpie el formulario
siempre que se cargue la página o cuando se presione
el botón limpiar del formulario
*/

const limpiarForm = () => {
    inputNombre.value = "";
    inputApellido.value = "";
    inputFechaNacimiento.value = "";
    inputRdMasculino.checked = false;
    inputRdFemenino.checked = false;
    cmbPais.value = 0;
    inputDireccion.value = "";
    inputNombrePais.value = "";

    inputNombre.focus();

    // Ejercicio 1: reiniciar variable de edición y cambiar texto al botón
    indexPacienteEditado = -1;
    buttonAgregarPaciente.innerHTML = '<i class="bi bi-person-plus-fill"></i> Guardar Datos';
};

//Función para validar el ingreso del paciente
const addPaciente = function () {
    let nombre = inputNombre.value;
    let apellido = inputApellido.value;
    let fechaNacimiento = inputFechaNacimiento.value;
    let sexo =
    inputRdMasculino.checked == true
        ? "Hombre"
        : inputRdFemenino.checked == true
        ? "Mujer"
        : "";
    let pais = cmbPais.value;
    let labelPais = cmbPais.options[cmbPais.selectedIndex].text;
    let direccion = inputDireccion.value;

    if (
    nombre != "" &&
    apellido != "" &&
    fechaNacimiento != "" &&
    sexo != "" &&
    pais != 0 &&
    direccion != ""
    ) {
        //Verificar si estamos editando o agregando
        if (indexPacienteEditado === -1) {
            //Agregando información al arreglo paciente
            arrayPaciente.push(
                new Array(nombre, apellido, fechaNacimiento, sexo, labelPais, direccion)
            );
            //Asignando un mensaje a nuestra notificación
            mensaje.innerHTML = "Se ha registrado un nuevo paciente";
        } else {
            //Actualizando el paciente en el arreglo
            arrayPaciente[indexPacienteEditado] = new Array(nombre, apellido, fechaNacimiento, sexo, labelPais, direccion);
            //Asignando un mensaje a nuestra notificación
            mensaje.innerHTML = "Se ha actualizado el paciente correctamente";
        }

        //Llamando al componente de Bootstrap
        toast.show();

        //Limpiando formulario
        limpiarForm();

        //Ejercicio 1: actualizar la tabla automáticamente si ya se mostró
        if (arrayPaciente.length > 0) {
            imprimirPacientes();
        }
    } else {
        //Asignando un mensaje a nuestra notificación
        mensaje.innerHTML = "Faltan campos por completar";
        //Llamando al componente de Bootstrap
        toast.show();
    }
};

//Función que imprime la ficha de los pacientes registrados
function imprimirFilas() {
    let $fila = "";
    let contador = 1;

    arrayPaciente.forEach((element) => {
    $fila += `<tr>
                <td scope="row" class="text-center fw-bold">${contador}</td>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td>${element[2]}</td>
                <td>${element[3]}</td>
                <td>${element[4]}</td>
                <td>${element[5]}</td>
                <td>
                    <button type="button" class="btn btn-primary btnEditar" data-index="${contador - 1}" alt="Editar">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button type="button" class="btn btn-danger btnEliminar" data-index="${contador - 1}" alt="Eliminar">
                        <i class="bi bi-trash-fill"></i>
                    </button>
                </td>
            </tr>`;
    contador++;
    });
    return $fila;
}

const imprimirPacientes = () => {
    let $table = `<div class="table-responsive">
                    <table class="table table-striped table-hover table-bordered">
                        <tr>
                            <th scope="col" class="text-center" style="width:5%">#</th>
                            <th scope="col" class="text-center" style="width:15%">Nombre</th>
                            <th scope="col" class="text-center" style="width:15%">Apellido</th>
                            <th scope="col" class="text-center" style="width:10%">Fecha nacimiento</th>
                            <th scope="col" class="text-center" style="width:10%">Sexo</th>
                            <th scope="col" class="text-center" style="width:10%">País</th>
                            <th scope="col" class="text-center" style="width:25%">Dirección</th>
                            <th scope="col" class="text-center" style="width:10%">Opciones</th>
                        </tr>
                        ${imprimirFilas()}
                    </table>
                </div>
                `;
    document.getElementById("idTablaPacientes").innerHTML = $table;
    //Ejercicio 1: agregar event listeners a los botones después de que la tabla se creó
    agregarEventListenersBotones();
};

//Contador global de los option correspondiente
//al select (cmb) país
let contadorGlobalOption = cmbPais.children.length;
const addPais = () => {
    let paisNew = inputNombrePais.value;

    if (paisNew != "") {
        // Creando nuevo option con la API DOM
        let option = document.createElement("option");
        option.textContent = paisNew;
        option.value = contadorGlobalOption + 1;

        //Agregando el nuevo option en el select
        cmbPais.appendChild(option);

        //Asignando un mensaje a nuestra notificación
        mensaje.innerHTML = "País agregado correctamente";
        //Llamando al componente de Bootstrap
        toast.show();
    } else {
        //Asignando un mensaje a nuestra notificación
        mensaje.innerHTML = "Faltan campos por completar";
        //Llamando al componente de Bootstrap
        toast.show();
    }
};

/*
Ejercicio 1 (nueva función): agregar event listeners a botones Editar y Eliminar
*/
const agregarEventListenersBotones = () => {
    //Event listeners para botón Editar
    const botonesEditar = document.querySelectorAll(".btnEditar");
    botonesEditar.forEach(boton => {
        boton.addEventListener("click", function() {
            const index = parseInt(this.getAttribute("data-index"));
            editarPaciente(index);
        });
    });
    
    //Event listeners para botón Eliminar
    const botonesEliminar = document.querySelectorAll(".btnEliminar");
    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", function() {
            const index = parseInt(this.getAttribute("data-index"));
            eliminarPaciente(index);
        });
    });
};

/*
Ejercicio 1 (nueva función): editar un paciente
*/
const editarPaciente = (index) => {
    const paciente = arrayPaciente[index];
    
    //Cargar datos del paciente en el formulario
    inputNombre.value = paciente[0];
    inputApellido.value = paciente[1];
    inputFechaNacimiento.value = paciente[2];
    
    //Seleccionar el sexo
    if (paciente[3] === "Hombre") {
        inputRdMasculino.checked = true;
    } else {
        inputRdFemenino.checked = true;
    }
    
    //Seleccionar el país
    for (let i = 0; i < cmbPais.options.length; i++) {
        if (cmbPais.options[i].text === paciente[4]) {
            cmbPais.value = cmbPais.options[i].value;
            break;
        }
    }
    
    inputDireccion.value = paciente[5];
    
    //Guardar el índice del paciente que se está editando
    indexPacienteEditado = index;
    
    //Cambiar el texto del botón
    buttonAgregarPaciente.innerHTML = '<i class="bi bi-pencil-square"></i> Actualizar datos';
    
    //Hacer scroll hacia el formulario
    inputNombre.focus();
    inputNombre.scrollIntoView({ behavior: 'smooth' });
    
    //Mostrar notificación
    mensaje.innerHTML = "Realiza los cambios y guarda";
    toast.show();
};

/*
Ejercicio 1 (nueva función): eliminar un paciente
*/
const eliminarPaciente = (index) => {
    //Confirmar antes de eliminar
    if (confirm("¿Está seguro de que desea eliminar este paciente?")) {
        //Eliminar del arreglo
        arrayPaciente.splice(index, 1);
        
        //Mostrar notificación
        mensaje.innerHTML = "Paciente eliminado correctamente";
        toast.show();
        
        //Actualizar la tabla
        imprimirPacientes();
    }
};

// Agregando eventos a los botones y utilizando funciones tipo flecha
buttonLimpiarPaciente.onclick = () => {
    limpiarForm();
};

buttonAgregarPaciente.onclick = () => {
    addPaciente();
};

buttonMostrarPaciente.onclick = () => {
    imprimirPacientes();
};

buttonAgregarPais.onclick = () => {
    addPais();
};

// Se agrega el focus en el campo nombre país del modal
idModal.addEventListener("shown.bs.modal", () => {
    inputNombrePais.value = "";
    inputNombrePais.focus();
});

//Ejecutar función al momento de cargar la página HTML
limpiarForm();