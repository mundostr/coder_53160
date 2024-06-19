import cartsModel from './models/carts.model.js';
import usersModel from './models/users.model.js';
import productsModel from './models/products.model.js';

class CartsManager {
    constructor() {
    }

    getAll = async () => {
        try {
            return await cartsModel
            .find()
            // Se pueden encadenar varios populate en una sola consulta
            .populate({ path: '_user_id', model: usersModel })
            .populate({ path: 'products._id', model: productsModel })
            .lean();
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

export default CartsManager;
