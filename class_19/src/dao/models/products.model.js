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
    code: { type: String, required: true },
    category: { type: String, enum: ['custom', 'special', 'standard'], default: 'standard' }
});

schema.plugin(mongoosePaginate);

const model = mongoose.model(collection, schema);

export default model;
