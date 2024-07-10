import orderModel from '../models/order.model.js';

class OrderService {
    constructor () {}

    async get() {
        try {
            return await orderModel.find().lean();
        } catch (err) {
            return err.message;
        }
    }

    async add(data) {
        try {
            return await orderModel.create(data);
        } catch (err) {
            return err.message;
        }
    }

    async update(id, data) {
        try {
            return await orderModel.updateOne({ _id: id }, { $set: data });
        } catch (err) {
            return err.message;
        }
    }

    async delete(id) {
        try {
            return await orderModel.deleteOne({ _id: id });
        } catch (err) {
            return err.message;
        }
    }
}

export default OrderService;
