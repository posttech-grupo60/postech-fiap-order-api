import {describe, expect, test} from 'vitest';
import Order, { OrderStatus } from '@src/entity/order';
import Customer from '@src/entity/customer';
import CPF from '@src/entity/value-objects/cpf';
import Product from '@src/entity/product';

describe('Entity Order', () => {
    test('Should create order', () => {
        const order = new Order(
            '1',
            new Customer('1','João da Silva',new CPF('191.639.050-19')),
            [
                {
                    product: new Product('1','Hamburguer', 'Hamburguer, pão, queijo, alface e tomate', 10.00,['img'], "LANCHE"),
                    quantity: 1
                }
            ]
        );
    
        expect(order.id).toBe('1');
        expect(order.status).toBe('received');
        expect(order.createdAt).toBeTruthy();
        
        order.setId('2');
        order.setStatus(OrderStatus.WAITING_PAYMENT);
        expect(order.id).toBe('2');
        expect(order.status).toBe(OrderStatus.WAITING_PAYMENT);
        
    });
});

