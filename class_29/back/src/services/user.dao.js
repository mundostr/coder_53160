import userModel from '../models/user.model.js';

class UserService {
    constructor () {}

    async get() {
        try {
            return await userModel.find().lean();
        } catch (err) {
            return err.message;
        }
    }

    async add(data) {
        try {
            return await userModel.create(data);
        } catch (err) {
            return err.message;
        }
    }

    async update(id, data) {
        try {
            return await userModel.updateOne({ _id: id }, { $set: data });
        } catch (err) {
            return err.message;
        }
    }

    async delete(id) {
        try {
            return await userModel.deleteOne({ _id: id });
        } catch (err) {
            return err.message;
        }
    }
}

export default UserService;
