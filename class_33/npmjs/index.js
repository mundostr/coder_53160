/**
 * Ejemplo básico creación y validación de hash bcrypt
 * para testear la subida de módulos propios a cuenta de npmjs.com
 * 
 * 1- Crear cuenta en npmjs.com
 * 2- Abrir terminal y ejecutar npm login
 * 3- Publicar luego:
 *      npm publish (privado)
 *      npm publish --access public (público)
 * 4- Atención, para futuras publicaciones, actualizar siempre
 *    la versión en package.json antes de subir.
 */

import bcrypt from 'bcrypt';

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const validateHash = (passwordToVerify, storedHash) => bcrypt.compareSync(passwordToVerify, storedHash);
