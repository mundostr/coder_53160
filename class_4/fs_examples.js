// Para integrar módulos externos a nuestro código, podemos utilizar tanto require como import
// import es la sintaxis que adpotaremos en el curso
// const fs = require('fs')
import fs from 'fs'

const DESTINATION_FILE = './first_content.txt'
const ALTERNATIVE_FILE = './second_content.txt'
const currentDateTimeIso = new Date().toISOString()
const currentDateTimeLocale = new Date().toLocaleString()


// OPCION 1: fs SINCRONO
// Pruebas de escritura y posterior lectura de archivo local
// Escribimos la fecha y hora actual a archivo, de forma síncrona, y luego lo leemos
// writeFileSync SOBREESCRIBE, appendFileSync AGREGA al final
// \n inserta un salto de línea
fs.writeFileSync(ALTERNATIVE_FILE, `Este es el SEGUNDO ARCHIVO\n${currentDateTimeLocale}\n`)
const content = fs.readFileSync(ALTERNATIVE_FILE, { encoding: 'utf-8'})
console.log(content)

fs.appendFileSync(DESTINATION_FILE, `${currentDateTimeLocale}\n`)
const content2 = fs.readFileSync(DESTINATION_FILE, { encoding: 'utf-8'})
console.log(content2)

// OPCION 2: fs ASINCRONO con callbacks
// Prueba de escritura y posterior lectura de archivo local
// Esta es una sintaxis alternativa utilizando callbacks. Recordar EVITAR
// un anidamiento muy pronunciado de los callbacks, utilizar solo 2 o 3 niveles
fs.appendFile(DESTINATION_FILE, `${currentDateTimeIso}\n`, (error) => {
    if (error) {
        console.log('No se pudo escribir el archivo: ', error.message)
        return
    }
    
    fs.readFile(DESTINATION_FILE, { encoding: 'utf-8'}, (error, result) => {
        if (error) {
            console.log('No se pudo leer el archivo: ', error.message)
            return
        }
        
        console.log(result)
    })
})

// OPCION 3: fs ASINCRONO con promesas
// Ver class_activity.js para ejemplo de sintaxis
