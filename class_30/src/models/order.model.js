import mongoose from 'mongoose';
import userModel from './user.model.js';
import businessModel from './business.model.js';
// import mongoosePaginate from 'mongoose-paginate-v2';

mongoose.pluralize(null);

const collection = 'class_29_orders';

const schema = new mongoose.Schema({
    number: { type: Number, required: true },
    business: { type: mongoose.SchemaTypes.ObjectId, ref: 'class_29_businesses', required: true },
    user: { type: mongoose.SchemaTypes.ObjectId, ref: 'class_29_users', required: true },
    products: { type: [], required: true },
    totalPrice: { type: Number, default: 0.0 },
    status: { type: String, enum: ['pending', 'ready', 'delivered'], default: 'pending' }
});

schema.pre('find', function () {
    this.populate({ path: 'business', model: businessModel });
    this.populate({ path: 'user', model: userModel });
});

// schema.plugin(mongoosePaginate);

const model = mongoose.model(collection, schema);

export default model;
