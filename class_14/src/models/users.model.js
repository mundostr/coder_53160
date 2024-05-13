/**
 * Mongoose trabaja a través de MODELOS.
 * 
 * Un modelo es una descripción (un esquema) de cómo están organizados
 * los datos en una colección, por ende a medida que sumemos colecciones,
 * iremos declarando un modelo para cada una.
 * 
 * Definimos en el esquema la lista de propiedades que guarda el documento,
 * normalmente aprovechamos el modelo para indicarle a Mongoose algunos
 * adicionales, como el tipo de dato, si la propiedad es obligatoria o no,
 * los valores aceptados y demás.
 * 
 * Exportamos aquí este modelo, para poder importarlo donde lo necesitemos,
 * TODA consulta que realizemos a la base de datos, la haremos a través
 * del modelo, utilizando métodos habituales como find, updateOne, etc.
 */

import mongoose from 'mongoose';

// Esta línea nos evitará problemas de nombres si Mongoose crea alguna colección no existente
mongoose.pluralize(null);

const collection = 'users';


const schema = new mongoose.Schema({
    // Estos parámetros son strings y aceptan cualquier valor
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    // role es un string pero NO acepta cualquier valor, SOLO
    // admin, premium o user. Si al realizar una consulta para agregar
    // o actualizar, no se indica esta propiedad (o se indica un valor no válido),
    // Mongoose utilizará el valor user.
    role: { type: String, enum: ['admin', 'premium', 'user'], default: 'user' }
});

const model = mongoose.model(collection, schema);

export default model;
