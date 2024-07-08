import mongoose from 'mongoose';
// import mongoosePaginate from 'mongoose-paginate-v2';

mongoose.pluralize(null);

const collection = 'class_29_users';

const schema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true, index: false },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'user'], default: 'user' },
    orders: [
        { type: mongoose.SchemaTypes.ObjectId, ref: 'class_29_orders' }
    ]
});

// schema.plugin(mongoosePaginate);

const model = mongoose.model(collection, schema);

export default model;
