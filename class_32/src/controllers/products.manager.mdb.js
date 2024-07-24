import ProductsService from '../services/products.dao.mdb.js';
// import ProductsService from '../services/dao.factory.js';

const service = new ProductsService();

class ProductsDTO {
    constructor(product) {
        this.product = product;
        this.product.title = this.product.title.toUpperCase();
    }
}

class ProductsManager {
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
            const normalizedData = new ProductsDTO(newData);
            return await service.add(normalizedData.product);
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

export default ProductsManager;
