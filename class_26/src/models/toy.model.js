import mongoose from 'mongoose';

mongoose.pluralize(null)

const collection = 'toys';

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true }
});

export default mongoose.model(collection, schema);
