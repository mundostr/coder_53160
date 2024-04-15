import fs from 'fs';

class ProductManager {
    constructor(file) {
        this.file = file;
        this.products = [];
    }

    async addProduct(newProduct) {
        await this.getProducts(0);
        
        // Verificar code, calcular nuevo id y realizar push si corresponde
        const codeExist = this.products.some(product => product.code === newProduct.code);
        if (!codeExist) {
            newProduct.id = this.products.length + 1;
            this.products.push(newProduct);
            await fs.promises.writeFile(this.file, JSON.stringify(this.products), 'utf-8');
        } else {
            console.log(`El código ya existe (${newProduct.code})`);
        }
    }

    async getProducts(limit) {
        const products = await fs.promises.readFile(this.file, 'utf-8');
        const parsedProducts = await JSON.parse(products);
        this.products = parsedProducts;

        return limit === 0 ? parsedProducts: parsedProducts.slice(0, limit);
    }

    async getProductById(id) {
        const products = await fs.promises.readFile(this.file, 'utf-8');
        const parsedProducts = await JSON.parse(products);
        this.products = parsedProducts;

        const product = this.products.find(product => product.id === +id) || {};
        return product;
    }
}

export default ProductManager;

// const manager = new ProductManager('./src/c2.json');
// await manager.addProduct({ name: 'Producto 3', price: 1500, stock: 30, code: 'ABC789' });
// console.log(await manager.getProducts(0));
