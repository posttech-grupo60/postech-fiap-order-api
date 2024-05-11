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
        const order = new Order(
            null,
            new Customer('1','João da Silva',new CPF('191.639.050-19')),
            [
                {
                    product: new Product('1','Hamburguer', 'Hamburguer, pão, queijo, alface e tomate', 10.00,['img'], "LANCHE"),
                    quantity: 1
                }
            ]
        );
        await memoryOrderRepository.save(order);
    });

    test('Should create an order of repository', () => {
        expect(memoryOrderRepository).toBeInstanceOf(MemoryOrderRepository);
        expect(memoryOrderRepository).toHaveProperty('save');
    });


    test('Should create order', async () => {
        const order = new Order(
            '2',
            new Customer('2','Maria Pereira',new CPF('191.639.050-19')),
            [
                {
                    product: new Product('2','Coca cola', '600ml', 8.00,['img'], "BEBIDA"),
                    quantity: 1
                }
            ]
        );
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
        expect(async () => await memoryOrderRepository.findById('1'))
            .rejects
            .toThrow('Order not found!');
        
        const [orderFound] = await memoryOrderRepository.list();
        const orders = await memoryOrderRepository.findById(orderFound?.id ?? '');
        expect(orders.id).toBe(orderFound?.id);
        expect(orders.status).toBe(orderFound?.status);
    });

    test('Should update order', async () => {
        let [productToUpdate] = await memoryOrderRepository.list();
        productToUpdate.items[0].quantity = 2;
        const orderUpdated = await memoryOrderRepository.update(productToUpdate);
        expect(orderUpdated.id).toBe(productToUpdate.id);
        expect(orderUpdated.status).toBe(productToUpdate?.status);
        expect(orderUpdated.items[0].quantity).toBe(2);

        const orderNotFound = new Order('3', new Customer('3','Maria Pereira',new CPF('191.639.050-19')), []);
        expect(async () => await memoryOrderRepository.update(orderNotFound))
            .rejects
            .toThrow('Order not found!');
    });
});