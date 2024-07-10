import OrderService from '../services/order.dao.js';
import BusinessService from '../services/business.dao.js';

const service = new OrderService();
const businessService = new BusinessService();

class orderDTO {
    constructor(data) {
        this.data = data;
        this.data.number = Date.now() + Math.floor(Math.random() * 10000 + 1);
        this.data.status = 'pending';

        let total = 0.0;
        this.data.products.forEach(element => { total += element.price });
        this.data.totalPrice = total;
    }
}

class OrderController {
    constructor() {
    }

    async get() {
        try {

            return await service.get();
        } catch (err) {
            return err.message
        }
        
    }

    async getBusinessProducts(id) {
        try {
            return await businessService.getOne(id);
        } catch (err) {
            return err.message
        }
        
    }

    async add(data) {
        try {
            // Consultamos del business los detalles de productos
            // y rearmamos el array del pedido con este detalle en lugar de los ids.
            // Esto solo como ejemplo para completar el ejercicio sugerido en los slides,
            // se podría resolver de manera más organizada colocando productos en una
            // colección separada y utilizando referencias, como ya hemos visto.
            const businessProducts = await this.getBusinessProducts(data.business);
            data.products = businessProducts.products.filter(product => data.products.includes(product.id));
            
            const normalized = new orderDTO(data);
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

export default OrderController;
