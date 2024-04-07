/**
 * Hands On Lab
 * 
 * 1- Crear clase Manager en archivo separado e importarlo.
 * 2- Agregar métodos para crear usuarios y consultar usuarios guardados.
 * 3- Se debe utilizar fs.promises.
 * 4- El objeto de usuario debe contener nombre, apellido, edad y curso (firstName, lastName, age, courseId)
 * 5- Se debe almacenar a los usuarios en un archivo utilizando un array.
 * 6- La consulta de usuarios debe leer el archivo y retornar el array.
 */


// Módulos
// Importamos directamente la clase, ver formato de exportación en managerUsuarios.js
import ManagerClass from './userManager.js'


// Funciones
// Declaramos una función asíncrona para las pruebas, pero también podríamos utilizar
// await directamente en el nivel principal (top level) del módulo.
const startProcess = async () => {
    const manager1 = new ManagerClass('./users.json')
    await manager1.createUser({ firstName: 'Juan', lastName: 'Perez', age: 30, courseId: 16 })
    await manager1.createUser({ firstName: 'Ignacio', lastName: 'Barrena', age: 30, courseId: 17 })
    await manager1.createUser({ firstName: 'Jorge', lastName: 'Lencuentro', age: 32, courseId: 18 })
    console.log(await manager1.getUsers())
}


// Flujo principal
startProcess()
