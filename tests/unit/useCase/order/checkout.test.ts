import {describe, expect, test, vi} from 'vitest';
import MemoryOrderRepository from '@repository/MemoryRepository/MemoryOrder.repository';
import MemoryCustomerRepository from '@repository/MemoryRepository/MemoryCustomer.repository';
import MemoryProductRepository from '@repository/MemoryRepository/MemoryProduct.repository';
import PaymentGateway from '@gateway/payment.gateway';
import Order from '@src/entity/order';
import Customer from '@src/entity/customer';
import CPF from '@src/entity/value-objects/cpf';
import Product from '@src/entity/product';
import Checkout from '@src/useCase/order/checkout.usecase';

vi.mock('@repository/MemoryRepository/MemoryOrder.repository', () => {
    const MemoryOrderRepository = vi.fn();
    MemoryOrderRepository.prototype.save = vi.fn((params: Order) => {
        params.setId(1);
        return params;
    });
    return {default: MemoryOrderRepository};
})

vi.mock('@repository/MemoryRepository/MemoryCustomer.repository', () => {
    const MemoryCustomerRepository = vi.fn();
    MemoryCustomerRepository.prototype.get = vi.fn(({id}) => {
        if(id === 1){
            return new Customer({id:1, name:'João da Silva',cpf: new CPF('191.639.050-19')});
        }
        return null;
    });
    return {default: MemoryCustomerRepository};
})

vi.mock('@repository/MemoryRepository/MemoryProduct.repository', () => {
    const MemoryProductRepository = vi.fn();
    MemoryProductRepository.prototype.get = vi.fn((id) => {
        if(id == 1){
            return new Product({id:1, name:'Hamburguer', description: 'Hamburguer, pão, queijo, alface e tomate', price: 10.00, images: ['img'], category: "LANCHE"});
        } else if(id == 2){
            return new Product({id:2, name:'Casquinha', description: 'Sorvete com massa', price: 5.00, images: ['img2'], category: "SOBREMESA"});
        }
        return null;
    });
    return {default: MemoryProductRepository};
})

vi.mock('@gateway/payment.gateway', () => {
    const PaymentGateway = vi.fn();
    PaymentGateway.prototype.createPayment = vi.fn((params) => {
        return {
            orderId: params.orderId,
            price: params.price,
            pay: false,
            qrCode: "0002011630002010102122653001418chave_pix_recebedo5204000053039865406undefined20.25802BR59134Fiap60079São Paulo620705036304Transaction6235G",
            id: "a3eb2b57-1efd-4a71-bd73-e5e48eb24070"
        }
    });
    return {default: PaymentGateway};
})

describe('UseCase Order', () => {
    test('Should do an order checkout', async () => {
        const orderRepository = new MemoryOrderRepository();
        const customerRepository = new MemoryCustomerRepository();
        const productRepository = new MemoryProductRepository();
        const paymentGateway = new PaymentGateway();
        const checkout = new Checkout(
            orderRepository,
            customerRepository,
            productRepository,
            paymentGateway
        );
        const response = await checkout.execute({
            customerId: 1,
            products: [
                {
                    id: 1,
                    quantity: 1
                },
                {
                    id: 2,
                    quantity: 1
                }
            ]
        });
        expect(response).toBeDefined();
        expect(response.id).toBe("a3eb2b57-1efd-4a71-bd73-e5e48eb24070");
        expect(response.qrCode).toBe("0002011630002010102122653001418chave_pix_recebedo5204000053039865406undefined20.25802BR59134Fiap60079São Paulo620705036304Transaction6235G");
    })

    test('Should reject checkout due to invalid customer', async () => {
        const orderRepository = new MemoryOrderRepository();
        const customerRepository = new MemoryCustomerRepository();
        const productRepository = new MemoryProductRepository();
        const paymentGateway = new PaymentGateway();
        const checkout = new Checkout(
            orderRepository,
            customerRepository,
            productRepository,
            paymentGateway
        );
        const response = checkout.execute({
            customerId: 3,
            products: [
                {
                    id: 1,
                    quantity: 1
                },
                {
                    id: 2,
                    quantity: 1
                }
            ]
        });

        expect(async () => await response).rejects.toThrowError("Customer not found!");
    })

    test('Should reject checkout due to empty cart', async () => {
        const orderRepository = new MemoryOrderRepository();
        const customerRepository = new MemoryCustomerRepository();
        const productRepository = new MemoryProductRepository();
        const paymentGateway = new PaymentGateway();
        const checkout = new Checkout(
            orderRepository,
            customerRepository,
            productRepository,
            paymentGateway
        );
        const response = checkout.execute({
            customerId: 1,
            products: [
            ]
        });

        expect(async () => await response).rejects.toThrowError("Empty cart!");
    })

    test('Should reject checkout due to invalid product quantity', async () => {
        const orderRepository = new MemoryOrderRepository();
        const customerRepository = new MemoryCustomerRepository();
        const productRepository = new MemoryProductRepository();
        const paymentGateway = new PaymentGateway();
        const checkout = new Checkout(
            orderRepository,
            customerRepository,
            productRepository,
            paymentGateway
        );
        const response = checkout.execute({
            customerId: 1,
            products: [
                {
                    id: 1,
                    quantity: 0
                },
            ]
        });

        expect(async () => await response).rejects.toThrowError("Product must have at least one unity!");
    })

    test('Should reject checkout due to invalid product not found', async () => {
        const orderRepository = new MemoryOrderRepository();
        const customerRepository = new MemoryCustomerRepository();
        const productRepository = new MemoryProductRepository();
        const paymentGateway = new PaymentGateway();
        const checkout = new Checkout(
            orderRepository,
            customerRepository,
            productRepository,
            paymentGateway
        );
        const response = checkout.execute({
            customerId: 1,
            products: [
                {
                    id: 7,
                    quantity: 1
                },
            ]
        });

        expect(async () => await response).rejects.toThrowError("Product not found");
    })

    test('Should reject checkout due to fail on save order', async () => {
        const orderRepository = new MemoryOrderRepository();
        orderRepository.save = vi.fn((params: Order) => {
            return Promise.resolve(params);
        });
        const customerRepository = new MemoryCustomerRepository();
        const productRepository = new MemoryProductRepository();
        const paymentGateway = new PaymentGateway();
        const checkout = new Checkout(
            orderRepository,
            customerRepository,
            productRepository,
            paymentGateway
        );
        const response = checkout.execute({
            customerId: 1,
            products: [
                {
                    id: 1,
                    quantity: 1
                },
            ]
        });

        expect(async () => await response).rejects.toThrowError("Error to process order");
    })
});