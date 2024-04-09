/**
 * HOL (Hands On Lab)
 * Creación de clase para almacenamiento básico de usuarios
 * Utilización de módulos nativos fs y crypto
 * 
 * La clase debe poder guardar datos de usuario en un archivo json, pero cifrando previamente
 * la clave que se recibe.
 * 
 * Por otro lado debe poder leer un usuario almacenado, y comparar tanto nombre de usuario como
 * clave contra un par de datos recibidos, para saber si coinciden.
  */

import fs from 'fs';
import crypto from 'crypto';


//Funciones y clases
class UserManager {
    constructor(file) {
        this.file = file;
    }

    async createUser(user) {
        // Aplicamos un cifrado simple con el módulo crypto a la clave "plana" recibida
        // y la sobreescribimos (user.pass)
        user.pass = crypto.createHash('sha256').update(user.pass).digest('hex');
        // Una vez cifrada la clave, almacenamos en archivo
        await fs.promises.writeFile(this.file, JSON.stringify(user, null, 2));
    }

    async validateUser(user, pass) {
        // Recuperamos los datos de usuario guardados en archivo
        const savedUser = await fs.promises.readFile(this.file);
        const savedUserJson = await JSON.parse(savedUser);
        
        // Como el cifrado que hemos hecho no es reversible, no tenemos opción de
        // "desencriptar" la clave. Lo que hacemos es aplicar el mismo proceso de
        // cifrado a la clave "plana" que recibimos ahora, y comparar ese resultado
        // con la clave almacenada en archivo.
        const hashedPass = crypto.createHash('sha256').update(pass).digest('hex');

        // Chequeamos si userName y las claves cifradas coinciden
        if (savedUserJson.userName === user && savedUserJson.pass === hashedPass) {
            console.log('Usuario logueado');
        } else {
            console.log('Usuario o clave no válidos');
        }
    }
}

const manager = new UserManager('./users.json');
// const newUser = { firstName: 'Carlos', lastName: 'Perren', userName: 'cperren', pass: 'abc456' };
// manager.createUser(newUser);
manager.validateUser('cperren', 'abc456');
