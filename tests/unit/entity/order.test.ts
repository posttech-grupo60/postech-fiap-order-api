import {describe, expect, test} from 'vitest';
import Order, { OrderStatus } from '@src/entity/order';
import Customer from '@src/entity/customer';
import CPF from '@src/entity/value-objects/cpf';
import Product from '@src/entity/product';

describe('Entity Order', () => {
    test('Should create order', () => {
        const order = new Order({
            id: 1,
            customer: new Customer({id: 1, name:'João da Silva',cpf: new CPF('191.639.050-19')}),
            items: [
                {
                    product: new Product({id:1, name:'Hamburguer', description:'Hamburguer, pão, queijo, alface e tomate', price: 10.00, images:['img'], category: "LANCHE"}),
                    quantity: 1
                }
            ]
        });
    
        expect(order.id).toBe(1);
        expect(order.status).toBe('received');
        expect(order.createdAt).toBeTruthy();
        
        order.setId(2);
        order.setStatus(OrderStatus.WAITING_PAYMENT);
        expect(order.id).toBe(2);
        expect(order.status).toBe(OrderStatus.WAITING_PAYMENT);
        expect(order.getTotal()).toBe(10);
        
    });
});

