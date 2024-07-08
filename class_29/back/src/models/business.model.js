import mongoose from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate-v2';

mongoose.pluralize(null);

const collection = 'class_29_businesses';

const schema = new mongoose.Schema({
    name: { type: String },
    products: []
});

// schema.plugin(mongoosePaginate);

const model = mongoose.model(collection, schema);

export default model;
