import cartsService from '../services/carts.dao.mdb.js';

const service = new cartsService();

class CartsDTO {
    constructor(cart) {
        // Agregar las demás normalizaciones que correspondan
        this.cart = cart;
    }
}

class CartsManager {
    constructor() {
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
            const normalizedData = new CartsDTO(newData);
            return await service.add(normalizedData.cart);
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

export default CartsManager;
