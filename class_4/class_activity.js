/**
 * 1- Leer archivo package.json
 * 2- Crear un objeto info con keys strContent, objContent y size.
 *    strContent debe tener el contenido de texto plano recuperado del archivo,
 *    objContent debe tener el contenido transformado a objeto de JS,
 *    size debe tener el tamaño en bytes del archivo
 * 3- Mostrar el objeto info por consola.
 * 4- Guardar el objeto info en un archivo info.json.
 * 5- Utilizar fs con promesas, sintaxis async / await y las utilidades JSON.parse() y JSON.stringify().
 */

// Importamos el módulo filesystem para manejo de archivos
import fs from 'fs'


// Constantes y variables globales
// Definimos un par de constantes para las ubicaciones de archivos
const CONFIG_FILE = './package.json'
const DESTINATION_FILE = './info.json'


// Funciones
// Declaramos una función asíncrona para aprovechar la sintaxis async / await.
// También podríamos utilizar el await directamente en el nivel principal (top level) del módulo.
const process = async () => {
    try {
        // Esperamos por el resultado en content, ahora utilizamos fs.promises
        const content = await fs.promises.readFile(CONFIG_FILE, { encoding: 'utf8' })
        // Volvemos a esperar por el resultado del parseo a JSON, es decir, convertimos
        // el texto recuperado del archivo en un OBJETO JSON que podemos operar en el código
        const jsonContent = await JSON.parse(content)

        // Hacemos una tercer espera usando el método stat (estadísticas)
        // Esto nos devolverá un objeto con info del archivo, por ejemplo su tamaño.
        const fileInfo = await fs.promises.stat(CONFIG_FILE)

        // Armamos el objeto info solicitado
        const info = {
            strContent: content,
            objContent: jsonContent,
            size: fileInfo.size // también podría ser directamente content.length
        }

        // Lo mostramos por consola y luego lo guardamos a disco
        console.log(info)
        // JSON.stringify(info, null, 2) permite agregar saltos de línea al escribir el contenido a archivo
        await fs.promises.writeFile(DESTINATION_FILE, JSON.stringify(info, null, 2))
    } catch (err) {
        console.error(err.message)
    }
}


// Flujo principal, solo se inicia la secuencia llamando a process()
process()
