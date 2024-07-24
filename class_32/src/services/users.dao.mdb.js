import usersModel from '../models/users.model.js';

class UsersService {
    constructor() {
    }

    getOne = async (filter) => {
        try {
            return await usersModel.findOne(filter).lean();
        } catch (err) {
            return err.message;
        };
    };

    getPaginated = async (limit, page) => {
        try {
            return await usersModel.paginate({}, { page: page, limit: limit, lean: true });
        } catch (err) {
            return err.message;
        };
    };

    add = async (newData) => {
        try {
            return await usersModel.create(newData);
        } catch (err) {
            return err.message;
        };
    };

    update = async (filter, update, options) => {
        try {
            return await usersModel.findOneAndUpdate(filter, update, options);
        } catch (err) {
            return err.message;
        };
    };

    delete = async (filter) => {
        try {
            return await usersModel.findOneAndDelete(filter);
        } catch (err) {
            return err.message;
        };
    };
}

export default UsersService;
