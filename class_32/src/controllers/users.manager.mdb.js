import UsersService from '../services/users.dao.mdb.js';

const service = new UsersService();

class UsersDTO {
    constructor(user) {
        // Agregar las demás normalizaciones que correspondan
        this.user = user;
    }
}

class UsersManager {
    constructor() {
    }

    getOne = async (filter) => {
        try {
            return await service.getOne(filter);
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
            const normalizedData = new UsersDTO(newData);
            return await service.add(normalizedData.user);
        } catch (err) {
            return err.message;
        };
    };

    update = async (filter, update, options) => {
        try {
            return await service.update(filter, update, options);
        } catch (err) {
            return err.message;
        };
    };

    delete = async (filter) => {
        try {
            return await service.delete(filter);
        } catch (err) {
            return err.message;
        };
    };
}

export default UsersManager;
