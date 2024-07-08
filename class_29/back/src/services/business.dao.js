import businessModel from '../models/business.model.js';

class BusinessService {
    constructor () {}

    async get() {
        try {
            return await businessModel.find().lean();
        } catch (err) {
            return err.message;
        }
    }

    async getOne(id) {
        try {
            return await businessModel.findOne({ _id: id }).lean();
        } catch (err) {
            return err.message;
        }
    }

    async add(data) {
        try {
            return await businessModel.create(data);
        } catch (err) {
            return err.message;
        }
    }

    async update(id, data) {
        try {
            return await businessModel.updateOne({ _id: id }, { $set: data });
        } catch (err) {
            return err.message;
        }
    }

    async delete(id) {
        try {
            return await businessModel.deleteOne({ _id: id });
        } catch (err) {
            return err.message;
        }
    }
}

export default BusinessService;
