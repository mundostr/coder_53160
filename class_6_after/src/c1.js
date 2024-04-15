class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct(newProduct) {
        // Verificar code, calcular nuevo id y realizar push si corresponde
        const codeExist = this.products.some(product => product.code === newProduct.code);
        if (!codeExist) {
            newProduct.id = this.products.length + 1;
            this.products.push(newProduct);
        } else {
            console.log(`El código ya existe (${newProduct.code})`);
        }
    }

    getProducts() {
        return this.products;
    }
}
