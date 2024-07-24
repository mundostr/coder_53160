import cartsModel from '../models/carts.model.js';

class CartsService {
    constructor() {
    }

    getOne = async (filter) => {
        try {
            return await cartsModel.findOne(filter).lean();
        } catch (err) {
            return err.message;
        };
    };

    getPaginated = async (limit, page) => {
        try {
            return await cartsModel.paginate({}, { page: page, limit: limit, lean: true });
        } catch (err) {
            return err.message;
        };
    };

    add = async (newData) => {
        try {
            return await cartsModel.create(newData);
        } catch (err) {
            return err.message;
        };
    };

    update = async (filter, update, options) => {
        try {
            return await cartsModel.findOneAndUpdate(filter, update, options);
        } catch (err) {
            return err.message;
        };
    };

    delete = async (filter) => {
        try {
            return await cartsModel.findOneAndDelete(filter);
        } catch (err) {
            return err.message;
        };
    };
}

export default CartsService;
