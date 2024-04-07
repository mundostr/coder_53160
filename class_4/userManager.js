// Importamos fs para manejo de archivos
import fs from 'fs'


// Exportamos la clase, en JS podemos usar export o export default.
// export: para exportar distintos elementos en un mismo archivo, por nombre (ver exampleExport debajo)
// Al importar se debe utilizar ese nombre exacto entre llaves (import {exampleExport} from ...)
// export default: para exportar un elemento por defecto (puede haber un solo export default por módulo).
// Al importar no hacen falta las llaves y se puede utilizar cualquier nombre para hacer referencia al elemento.
// import Manager from ... o import myManager from ... o el nombre que se desee.

export const exampleExport = 'Contenido exportado'

export default class Manager {
    constructor(file) {
        this.file = file
    }

    /**
     * 1- Recibimos un objeto de usuario (newUser)
     * 2- Verificamos que contenga los 4 campos requeridos (hasOwnProperty)
     * 3- Recuperamos el array actual de usuarios en archivo (this.getUsers()) -> usa JSON.parse()
     * 4- Agregamos el nuevo usuario al array
     * 5- Grabamos el nuevo array al archivo, formateándolo con JSON.stringify()
     */
    async createUser(newUser) {
        try {
            if (newUser.hasOwnProperty('firstName') && newUser.hasOwnProperty('lastName') && newUser.hasOwnProperty('age') && newUser.hasOwnProperty('courseId')) {
                const currentUsers = await this.getUsers()
                currentUsers.push(newUser)
                await fs.promises.writeFile(this.file, JSON.stringify(currentUsers, null, 2))
            }
        } catch(err) {
            console.error(err.message)
        }
    }

    // Obtenemos la lista de usuarios desde archivo y la retornamos parseada como un objeto JSON
    async getUsers() {
        try {
            const users = await fs.promises.readFile(this.file)
            const usersJson = await JSON.parse(users)
            return usersJson
        } catch(err) {
            console.error(err.message)
        }
    }
}
