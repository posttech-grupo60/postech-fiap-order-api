import OrderAdapter from '@src/adapter/OrderAdapter';
import Customer from '@src/entity/customer';
import Order from '@src/entity/order';
import Product from '@src/entity/product';
import CPF from '@src/entity/value-objects/cpf';
import {describe, expect, test} from 'vitest';

describe('Adapter Order', () => {
    test('Should create convert object to Customer', () => {
        const response = OrderAdapter.create({
            id: 1,
            customer:  new Customer({id: 1, name: 'John Doe', cpf: new CPF('24454136211')}),
            productsAndQuantity: [{
                product: new Product({id: 1, name: 'Hamburguer', description: 'Hamburguer de carne', price: 10, images: ['https://www.google.com'], category: 'LANCHE'}),
                quantity: 3
            }] 
        });
        expect(response).toBeInstanceOf(Order);
        expect(response.id).toBe(1);
        expect(response.customer.name).toBe('John Doe');
        expect(response.items[0].quantity).toBe(3);
        expect(response.items[0].product.name).toBe('Hamburguer');
        
    });
});