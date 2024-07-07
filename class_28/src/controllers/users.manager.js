import UsersService from '../services/users.dao.mdb.js';

const service = new UsersService();

class UsersManager {
    constructor() {
    }

    getOne = async (filter) => {
        try {
            return await usersModel.findOne(filter).lean();
        } catch (err) {
            return err.message;
        };
    };

    getPaginated = async (limit = 0, page = 1) => {
        try {
            return await service.getPaginated(limit, page);
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

export default UsersManager;
