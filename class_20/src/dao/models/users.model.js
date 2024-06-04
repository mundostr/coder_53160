import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

mongoose.pluralize(null);

const collection = 'users_index';
// const collection = 'users_aggregate';

const schema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true, index: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'premium', 'user'], default: 'user' },
    // Las propiedades grade y region las colocamos para probar el uso de aggregate,
    // deshabilitarlas al testear el paginado con la otra colección
    grade: { type: Number, required: true },
    region: { type: String, enum: ['Cordoba', 'Buenos Aires', 'Tucuman', 'Mendoza', 'Rosario'], default: 'Cordoba' }
});

schema.plugin(mongoosePaginate);

const model = mongoose.model(collection, schema);

export default model;
