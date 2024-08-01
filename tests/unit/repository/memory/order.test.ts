import {beforeAll, describe, expect, test} from 'vitest';
import MemoryOrderRepository from '../../../../src/repository/MemoryRepository/MemoryOrder.repository';
import Order, { OrderStatus } from '@src/entity/order';
import Customer from '@src/entity/customer';
import CPF from '@src/entity/value-objects/cpf';
import Product from '@src/entity/product';


describe('Memory Repository Order', () => {
    let memoryOrderRepository: MemoryOrderRepository;
    beforeAll(async () => {
        memoryOrderRepository = new MemoryOrderRepository();
        const order = new Order({
            customer: new Customer({id: 1, name: 'João da Silva', cpf: new CPF('191.639.050-19')}),
            items: [
                {
                    product: new Product({id:1, name:'Hamburguer', description:'Hamburguer, pão, queijo, alface e tomate', price:10.00, images: ['img'], category: "LANCHE"}),
                    quantity: 1
                }
            ]
        });
        await memoryOrderRepository.save(order);
    });

    test('Should create an order of repository', () => {
        expect(memoryOrderRepository).toBeInstanceOf(MemoryOrderRepository);
        expect(memoryOrderRepository).toHaveProperty('save');
    });


    test('Should create order', async () => {
        const order = new Order({
            id: 2,
            customer: new Customer({id: 2,name: 'Maria Pereira', cpf: new CPF('191.639.050-19')}),
            items: [
                {
                    product: new Product({id:2,name:'Coca cola', description: '600ml', price:8.00, images: ['img'], category: "BEBIDA"}),
                    quantity: 1
                }
            ]
        });
        const response = await memoryOrderRepository.save(order);
        expect(response.status).toBe(OrderStatus.RECEIVED);
        expect(response.items.length).toBe(1);
        expect(response.customer.name).toBe('Maria Pereira');	
    });

    test('Should create list orders', async () => {
        const list = await memoryOrderRepository.list();
        expect(list.length).toBe(2);
    });
    
    test('Should get order by id', async () => {
        expect(async () => await memoryOrderRepository.findById(0))
            .rejects
            .toThrow('Order not found!');
        
        const [orderFound] = await memoryOrderRepository.list();
        if(!orderFound?.id) throw new Error('Order not found!');
        const orders = await memoryOrderRepository.findById(orderFound.id);
        expect(orders.id).toBe(orderFound?.id);
        expect(orders.status).toBe(orderFound?.status);
    });

    test('Should update order', async () => {
        const [productToUpdate] = await memoryOrderRepository.list();
        productToUpdate.items[0].quantity = 2;
        const orderUpdated = await memoryOrderRepository.update(productToUpdate);
        expect(orderUpdated.id).toBe(productToUpdate.id);
        expect(orderUpdated.status).toBe(productToUpdate?.status);
        expect(orderUpdated.items[0].quantity).toBe(2);

        const orderNotFound = new Order({id: 3, customer: new Customer({id:3, name: 'Maria Pereira',cpf: new CPF('191.639.050-19')}), items: []});
        expect(async () => await memoryOrderRepository.update(orderNotFound))
            .rejects
            .toThrow('Order not found!');
    });
});