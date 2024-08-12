import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

mongoose.pluralize(null);

const collection = 'products';

const schema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: false },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    // Agregamos un campo owner (propietario) que nos servirá
    // más adelante para ver a quién pertenece determinado producto
    // y decidir si permitimos ejecutar la acción (borrado por ejemplo)
    owner: { type: String, default: 'admin' }
});

schema.plugin(mongoosePaginate);

const model = mongoose.model(collection, schema);

export default model;
