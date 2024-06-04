/**
 * Generamos un par de funciones para trabajar con claves,
 * una para crear el hash a partir de una clave plana, y la
 * otra para verificar validez aplicando el mismo hash a la
 * clave plana y comparando con la hasheada almacenada
 */

import bcrypt from 'bcrypt';

export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (passwordToVerify, storedHash) => bcrypt.compareSync(passwordToVerify, storedHash);
