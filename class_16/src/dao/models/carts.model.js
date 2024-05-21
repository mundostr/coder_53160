import mongoose from 'mongoose';
// import usersModel from './users.model.js';

mongoose.pluralize(null);

const collection = 'carts';

/**
 * El modificador ref nos permite cruzar datos con otra colección.
 * 
 * En este ejemplo, el _user_id se cruzará con la colección users_index
 * para recuperar desde allí todos los datos de ese usuario y adjuntarlos
 * a la consulta que se haga desde este modelo.
 * 
 * Este ref SE DEBE COMPLEMENTAR con un populate() en el lugar donde se
 * realiza la consulta, o la activación del middleware pre (ver debajo)
 * para que se agregue automáticamente el populate al utilizar el método
 * de búsqueda (find en este caso).
 * 
 * Elegir UNA de las dos opciones, lógicamente NO AMBAS a la vez.
 */
const schema = new mongoose.Schema({
    _user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users_index' },
    products: { type: [{ _id: mongoose.Schema.Types.ObjectId, qty: Number }], required: true }
    // products: { type: [{ _id: mongoose.Schema.Types.ObjectId, qty: Number }], required: true, ref: 'products' }
});

/* schema.pre('find', function () {
    this.populate({ path: '_user_id', model: usersModel });
}); */

const model = mongoose.model(collection, schema);

export default model;
