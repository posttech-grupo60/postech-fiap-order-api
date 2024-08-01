import {describe, expect, test, vi} from 'vitest';
import MemoryOrderRepository from '@repository/MemoryRepository/MemoryOrder.repository';
import ListOrders from '@src/useCase/order/listOrders.usecase';
import Order, { OrderStatus } from '@src/entity/order';
import Customer from '@src/entity/customer';
import CPF from '@src/entity/value-objects/cpf';
import Product from '@src/entity/product';

vi.mock('@repository/MemoryRepository/MemoryOrder.repository', () => {
    const MemoryOrderRepository = vi.fn();
    MemoryOrderRepository.prototype.list = vi.fn(() => {
        const order1 = new Order({
            customer: new Customer({id:1,name:'João da Silva',cpf:new CPF('191.639.050-19')}),
            items: [
                {
                    product: new Product({id: 1, name:'Hamburguer', description:'Hamburguer, pão, queijo, alface e tomate', price: 10.00, images: ['img'], category: "LANCHE"}),
                    quantity: 1
                }
            ]
        })
        order1.setStatus(OrderStatus.RECEIVED);
        const order2 = new Order({
            customer: new Customer({id:2, name: 'Maria Rosario', cpf:new CPF('633.698.970-40')}),
            items: [
                {
                    product: new Product({id: 1, name: 'Casquinha', description: 'Sorvete com massa', price: 5.00, images: ['img2'], category: "SOBREMESA"}),
                    quantity: 1
                }
            ]
        })
        order2.setStatus(OrderStatus.FINISHED);
        return [order1, order2];
    });
    return {default: MemoryOrderRepository};
})

describe('UseCase Order', () => {
    test('List Products', async () => {
        const orderRepository = new MemoryOrderRepository();
        const listAllProducts = new ListOrders(orderRepository);
        const response = await listAllProducts.execute();
        expect(response).toBeDefined();
        expect(response.length).toEqual(2);
    })
});