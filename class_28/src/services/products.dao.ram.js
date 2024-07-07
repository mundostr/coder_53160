class ProductsService {
    constructor() {
        this.products = [
            { _id: 1, title: 'Producto 1', price: 100.1, stock: 10 },
            { _id: 2, title: 'Producto 2', price: 22, stock: 0 },
            { _id: 3, title: 'Producto 3', price: 90.3, stock: 50 }
        ]
    }

    getOne = async (filter) => {
        try {
            const product = this.products.find(product => product._id === filter._id);
            return product;
        } catch (err) {
            return err.message;
        };
    };

    getPaginated = async (limit, page) => {
        try {
            return this.products;
        } catch (err) {
            return err.message;
        };
    };

    add = async (newData) => {
        try {
            this.products.push(newData);
            return newData;
        } catch (err) {
            return err.message;
        };
    };

    update = async (filter, update, options) => {
        try {
            const indexToUpdate = this.products.findIndex(product => product._id === filter._id);
            this.products[indexToUpdate] = update;
            return this.products[indexToUpdate];
        } catch (err) {
            return err.message;
        };
    };

    delete = async (filter) => {
        try {
            this.products = this.products.filter(product => product._id !== filter._id);
            return this.products;
        } catch (err) {
            return err.message;
        };
    };
}

export default ProductsService;
