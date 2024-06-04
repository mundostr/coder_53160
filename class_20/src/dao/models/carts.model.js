import mongoose from 'mongoose';
// import usersModel from './users.model.js';

mongoose.pluralize(null);

const collection = 'carts';

const schema = new mongoose.Schema({
    _user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users_index' },
    // products: { type: [{ _id: mongoose.Schema.Types.ObjectId, qty: Number }], required: true }
    products: { type: [{ _id: mongoose.Schema.Types.ObjectId, qty: Number }], required: true, ref: 'products' }
});

/**
 * Recordar que puede habilitarse el populate automático para no tener
 * que hacerlo en cada consulta. En este caso, CUALQUIER consulta que
 * utilice find(), hará el populate del _user_id.
 */
/* schema.pre('find', function () {
    this.populate({ path: '_user_id', model: usersModel });
}); */

const model = mongoose.model(collection, schema);

export default model;
