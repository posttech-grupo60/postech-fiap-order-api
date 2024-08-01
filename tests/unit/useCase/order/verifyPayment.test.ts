import {describe, expect, test, vi} from 'vitest';
import MemoryOrderRepository from '@repository/MemoryRepository/MemoryOrder.repository';
import PaymentGateway from '@gateway/payment.gateway';
import Order from '@src/entity/order';
import Customer from '@src/entity/customer';
import CPF from '@src/entity/value-objects/cpf';
import Product from '@src/entity/product';
import VerifyPayment from '@src/useCase/order/verifyPayment.usecase';
import ProductionGateway from '@src/gateway/production.gateway';

vi.mock('@repository/MemoryRepository/MemoryOrder.repository', () => {
    const MemoryOrderRepository = vi.fn();
    MemoryOrderRepository.prototype.findById = vi.fn((id: number) => {
        if(id === 9){
            return undefined;
        }
        if(id == 11){
            return new Order({
                id,
                customer: new Customer({name: 'João da Silva', cpf: new CPF('191.639.050-19')}),
                items:[
                {
                    product: new Product({id:1, name: 'Hamburguer', description: 'Hamburguer, pão, queijo, alface e tomate', price: 10.00, images: ['img'], category: "LANCHE"}),
                    quantity: 1
                }
            ]});
        }
        return new Order({
            id,
            customer: new Customer({id: 1, name: 'João da Silva', cpf: new CPF('191.639.050-19')}),
            items:[
            {
                product: new Product({id:1, name: 'Hamburguer', description: 'Hamburguer, pão, queijo, alface e tomate', price: 10.00, images: ['img'], category: "LANCHE"}),
                quantity: 1
            },
            {
                product: new Product({name: 'Casquinha', description: 'Sorvete com massa', price:5.00, images: ['img2'], category: "SOBREMESA"}),
                quantity: 1
            }
        ]});
    });
    return {default: MemoryOrderRepository};
})

vi.mock('@gateway/payment.gateway', () => {
    const PaymentGateway = vi.fn();
    PaymentGateway.prototype.getPayment = vi.fn((orderId: number) => {
        if(orderId == 1 || orderId == 9 || orderId == 11){
            return {
                orderId,
                price: 15.00,
                pay: true,
                qrCode: "000201163000"
            }
        }
        if(orderId == 5){
            return {
                orderId,
                price: 15.00,
                pay: false,
                qrCode: "000201163000"
            }
        }
        return undefined;
    });
    return {default: PaymentGateway};
})

vi.mock('@gateway/production.gateway', () => {
    const PaymentGateway = vi.fn();
    PaymentGateway.prototype.send = vi.fn((obj) => {
        console.log("obj >>>",obj);
        return undefined;
    });
    return {default: PaymentGateway};
})

describe('UseCase Order', () => {
    test('Should verify paid payment', async () => {
        const orderRepository = new MemoryOrderRepository();
        const paymentGateway = new PaymentGateway();
        const productionGateway = new ProductionGateway();
        const verifyPayment = new VerifyPayment(orderRepository, paymentGateway,productionGateway);

        const response1 = await verifyPayment.execute({
            orderId: 1
        });

        expect(response1).toBe(true);
    })

    test('Should verify not paid payment', async () => {
        const orderRepository = new MemoryOrderRepository();
        const paymentGateway = new PaymentGateway();
        const productionGateway = new ProductionGateway();
        const verifyPayment = new VerifyPayment(orderRepository, paymentGateway,productionGateway);

        const response = await verifyPayment.execute({
            orderId: 5
        });

        expect(response).toBe(false);
    })

    test('Should throw payment not found', async () => {
        const orderRepository = new MemoryOrderRepository();
        const paymentGateway = new PaymentGateway();
        const productionGateway = new ProductionGateway();
        const verifyPayment = new VerifyPayment(orderRepository, paymentGateway,productionGateway);

        const response = verifyPayment.execute({
            orderId: 2
        });

        expect(async () => await response).rejects.toThrowError("Order or Payment not found");
    })

    test('Should throw order not found', async () => {
        const orderRepository = new MemoryOrderRepository();
        const paymentGateway = new PaymentGateway();
        const productionGateway = new ProductionGateway();
        const verifyPayment = new VerifyPayment(orderRepository, paymentGateway,productionGateway);

        const response = verifyPayment.execute({
            orderId: 9
        });

        expect(async () => await response).rejects.toThrowError("Order not found!");
    })

    test('Should throw invalid customer', async () => {
        const orderRepository = new MemoryOrderRepository();
        const paymentGateway = new PaymentGateway();
        const productionGateway = new ProductionGateway();
        const verifyPayment = new VerifyPayment(orderRepository, paymentGateway,productionGateway);

        const response = verifyPayment.execute({
            orderId: 11
        });
        expect(async () => await response).rejects.toThrowError("Invalid customer!");
    })
});