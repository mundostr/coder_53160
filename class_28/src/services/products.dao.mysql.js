// import mysql from 'mysql2/promise';
import config from '../config.js';

class ProductsService {
    constructor() {
        this.connection = null;
        this.#connect();
    }

    async #connect() {
        this.connection = await mysql.createConnection({
            host: config.MYSQL_HOST,
            user: config.MYSQL_USER,
            password: config.MYSQL_PASS,
            database: config.MYSQL_DDBB
        });
    }

    getOne = async (filter) => {
        try {
            if (!this.connection) this.#connect();
            const product = await this.connection.execute(`SELECT * FROM products WHERE _id = ${filter._id}`);
            return product;
        } catch (err) {
            return err.message;
        };
    };
}

export default ProductsService;
