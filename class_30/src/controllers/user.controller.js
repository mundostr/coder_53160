import UserService from '../services/user.dao.js';
import { createHash } from '../services/utils.js';

const service = new UserService();

class userDTO {
    constructor(data) {
        this.data = data;
        this.data.lastName = this.data.lastName.toUpperCase();
        this.data.password = createHash(this.data.password);
        this.data.orders = [];
    }
}

class UserController {
    constructor() {
    }

    async get() {
        try {
            return await service.get();
        } catch (err) {
            return err.message
        }
        
    }

    async add(data) {
        try {
            const normalized = new userDTO(data);
            return await service.add(normalized.data);
        } catch (err) {
            return err.message
        }
    }

    async update(id, data) {
        try {
            return await service.update(id, data);
        } catch (err) {
            return err.message
        }
    }

    async delete(id) {
        try {
            return await service.delete(id);
        } catch (err) {
            return err.message
        }
    }
}

export default UserController;
