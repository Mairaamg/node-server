const readline = require('readline-sync');

const listaDeTareas = [
  { indicador: '1', descripcion: 'Repasar HTML', completada: false },
  { indicador: '2', descripcion: 'Repasar CSS', completada: false },
  { indicador: '3', descripcion: 'Repasar JavaScript', completada: false },
  { indicador: '4', descripcion: 'Repasar funciones de JavaScript', completada: false },
  { indicador: '5', descripcion: 'Hacer ejercicios de práctica de JavaScript', completada: false },
  { indicador: '6', descripcion: 'Estudiar NodeJs', completada: false },
];

function mostrarTareas() {
  console.log('Lista de tareas:');
  listaDeTareas.forEach((tarea) => {
    console.log(`${tarea.indicador}. [${tarea.completada ? 'X' : ' '}] ${tarea.descripcion}`);
  });
}

async function agregarTarea(descripcion) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const nuevaTarea = {
        indicador: (listaDeTareas.length + 1).toString(),
        descripcion,
        completada: false,
      };
      listaDeTareas.push(nuevaTarea);
      console.log(`Tarea "${descripcion}" añadida.`);
      resolve();
    }, 3000); 
  });
}


async function eliminarTarea(indicador) {
  return new Promise((resolve, reject) => {
    const tareaAEliminar = listaDeTareas.find((tarea) => tarea.indicador === indicador);
    if (tareaAEliminar) {
      const descripcion = tareaAEliminar.descripcion;
      listaDeTareas.splice(listaDeTareas.indexOf(tareaAEliminar), 1);
      console.log(`Tarea "${descripcion}" eliminada.`);
      resolve();
    } else {
      reject(`No se encontró una tarea con el indicador "${indicador}".`);
    }
  });
}

async function completarTarea(indicador) {
  return new Promise((resolve, reject) => {
    const tareaACompletar = listaDeTareas.find((tarea) => tarea.indicador === indicador);
    if (tareaACompletar) {
      tareaACompletar.completada = true;
      console.log(`Tarea "${tareaACompletar.descripcion}" marcada como completada.`);
      resolve();
    } else {
      reject(`No se encontró una tarea con el indicador "${indicador}".`);
    }
  });
}

async function main() {
  while (true) {
    console.log('\nOpciones:');
    console.log('1. Mostrar lista de tareas');
    console.log('2. Agregar tarea');
    console.log('3. Eliminar tarea');
    console.log('4. Completar tarea');
    console.log('5. Salir');

    const opcion = readline.question('Seleccione una opción: ');
    switch (opcion) {
      case '1':
        mostrarTareas();
        break;
      case '2':
        const descripcion = readline.question('Ingrese la descripción de la tarea: ');
        await agregarTarea(descripcion);
        break;
      case '3':
        const indicadorEliminar = readline.question('Ingrese el indicador de la tarea que desea eliminar: ');
        try {
          await eliminarTarea(indicadorEliminar);
        } catch (error) {
          console.error(error);
        }
        break;
      case '4':
        const indicadorCompletar = readline.question('Ingrese el indicador de la tarea que desea marcar como completada: ');
        try {
          await completarTarea(indicadorCompletar);
        } catch (error) {
          console.error(error);
        }
        break;
      case '5':
        console.log('¡Hasta luego!');
        process.exit(0);
      default:
        console.log('Opción no válida. Por favor, seleccione una opción válida.');
        break;
    }
  }
}

main();
