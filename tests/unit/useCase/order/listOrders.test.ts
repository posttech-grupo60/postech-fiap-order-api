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
        const order1 = new Order(
            null,
            new Customer('1','João da Silva',new CPF('191.639.050-19')),
            [
                {
                    product: new Product('1','Hamburguer', 'Hamburguer, pão, queijo, alface e tomate', 10.00,['img'], "LANCHE"),
                    quantity: 1
                }
            ]
        )
        order1.setStatus(OrderStatus.RECEIVED);
        const order2 = new Order(
            null,
            new Customer('2','Maria Rosario',new CPF('633.698.970-40')),
            [
                {
                    product: new Product('1','Casquinha', 'Sorvete com massa', 5.00,['img2'], "SOBREMESA"),
                    quantity: 1
                }
            ]
        )
        order2.setStatus(OrderStatus.FINISHED);
        return [order1, order2];
    });
    return {default: MemoryOrderRepository};
})

describe('UseCase Product', () => {
    test('List Products', async () => {
        const orderRepository = new MemoryOrderRepository();
        const listAllProducts = new ListOrders(orderRepository);
        const response = await listAllProducts.execute();
        expect(response).toBeDefined();
        expect(response.length).toEqual(2);
    })
});