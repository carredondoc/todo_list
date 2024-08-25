const inputTexto = document.getElementById("inputTexto");
const listadoTareas = document.getElementById("listadoTareas");
let totalTareas = document.querySelector(".totalTareas");
let totalRealizadas = document.querySelector(".totalRealizadas");


//Array con objetos base.

let elementosListados = [
  { id: 1, tarea: "Pasear al perro.", checked: false },
  { id: 2, tarea: "Comer Almuerzo.", checked: false },
  { id: 3, tarea: "Ir a dormir.", checked: false },
];


//Apretar enter para agregar item.

document.addEventListener("keydown", function (agregar) {
  if (agregar.key === "Enter") {
    agregar.preventDefault();
    const button = document.querySelector(".enviar");
    if (button) {
      button.click();
    }
  }
});


//Agregar Tarea.

function agregarTarea() {
  let contenidoTarea = inputTexto.value.trim();

  if (contenidoTarea === "") {
    alert("Por favor escribe una tarea");
  } else {
    const nuevaTarea = {
      id: elementosListados.length + 1,
      tarea: contenidoTarea,
      checked: false,
    };

    elementosListados.push(nuevaTarea);
    inputTexto.value = "";
    console.log(elementosListados);
    renderTareas();
  }

  totalTareas.innerHTML = elementosListados.length;
}

function renderTareas() {
  let html = "";

  for (const elementoListado of elementosListados) {
    const tareaClass = elementoListado.checked ? "tachado" : "";

    html += `
      <div class="tarea">
        <p>${elementoListado.id}</p>
        <p class="detalleTarea ${tareaClass}">${elementoListado.tarea}</p>
        <img src="./assets/Images/circulo.png" alt="" class="circulo" id="check-${elementoListado.id}" />
        <img src="./assets/Images/eliminar.png" alt="" class="eliminar" id="delete-${elementoListado.id}" />
      </div>
    `;
  }


//Eliminar Items


  const divTareas = document.querySelector(".tareas");
  divTareas.innerHTML = html;

  totalTareas.innerHTML = elementosListados.length;

  document.querySelectorAll(".eliminar").forEach(function (boton) {
    boton.addEventListener("click", terminarTarea);
  });

  document.querySelectorAll(".circulo").forEach(function (boton) {
    boton.addEventListener("click", tareaCompletada);
  });
}

function terminarTarea(event) {
  const id = Number(event.target.id.replace("delete-", ""));

  const index = elementosListados.findIndex(function (tarea) {
    return tarea.id === id;
  });

  if (index !== -1) {
    elementosListados.splice(index, 1);
    renderTareas();
  }

//Tarea Completada

}

function tareaCompletada(event) {
  const id = Number(event.target.id.replace("check-", ""));

  const tarea = elementosListados.find(function (tarea) {
    return tarea.id === id;
  });

  if (tarea) {
    tarea.checked = !tarea.checked;
  }

  totalRealizadas.innerHTML = elementosListados.filter(
    (elementosListados) => elementosListados.checked
  ).length;

  renderTareas();
}

renderTareas();


