import { Given, When, Then } from '@cucumber/cucumber';
import * as assert from "assert";
import Customer from '../../../src/entity/customer';
import Product from '../../../src/entity/product';
import CPF from '../../../src/entity/value-objects/cpf';
import MemoryCustomerRepository from '../../../src/repository/MemoryRepository/MemoryCustomer.repository';
import MemoryProductRepository from '../../../src/repository/MemoryRepository/MemoryProduct.repository';
import MemoryOrderRepository from '../../../src/repository/MemoryRepository/MemoryOrder.repository';
import Checkout from '../../../src/useCase/order/checkout.usecase';
import { IPaymentGateway, InputCreatePayment, OutputCreatePayment, OutputGetPayment } from '../../../src/gateway/interfaces/payment.interface';

class PaymentGatewayMock implements IPaymentGateway {
    createPayment(paymentInfo: InputCreatePayment): Promise<OutputCreatePayment> {
        return Promise.resolve({
            orderId: paymentInfo.orderId,
            pay: false,
            price: paymentInfo.price,
            qrCode: "meu-qrcode",
            id: "123"
        })
    }
    getPayment(orderId: string): Promise<OutputGetPayment> {
        throw new Error('Method not implemented.');
    }
    
}
const paymentGateway = new PaymentGatewayMock();
const customerRepository = new MemoryCustomerRepository();
const productRepository = new MemoryProductRepository();
const orderReposittory = new MemoryOrderRepository();

let customerId: number;
let productsAndQuantities: {id: number, quantity: number}[];
let checkoutOutput: {
    orderId: string;
	price: number;
	pay: boolean;
	qrCode: string;
	id: string;
};


Given("Quando tenho um customerId", async () => {
    const customer = new Customer({name: "Sebastião Silva", cpf: new CPF("556.264.620-07")});
    const savedCustomer = await customerRepository.save(customer);
    if(savedCustomer?.id) customerId = savedCustomer.id;
})

Given("Quando tenho produtos com quantidades", async () => {
    const product1 = new Product({name: "Hamburguer de Picanha", price: 10.0, description: "Pão, carne e queijo", category: "LANCHE", images: ["https://www.google.com.br"]});
    const savedProduct1 = await productRepository.save(product1);
    const product2 = new Product({name: "Refrigerante", price: 5.0, description: "Lata 350ml", category: "BEBIDA", images: ["https://www.google.com.br"]});
    const savedProduct2 = await productRepository.save(product2);

    if(savedProduct1?.id && savedProduct2?.id) {
        productsAndQuantities = [
            {id: savedProduct1.id, quantity: 2},
            {id: savedProduct2.id, quantity: 1}
        ]
    }
})

When("Realizo o checkout", async () => {
    const checkout = new Checkout(orderReposittory, customerRepository, productRepository, paymentGateway);
    checkoutOutput = await checkout.execute({customerId, products: productsAndQuantities});
})

Then("Obtenho o id do Pedido", async () => {
    assert.equal(checkoutOutput.price, 25);
    assert.equal(checkoutOutput.pay, false);
    assert.equal(checkoutOutput.qrCode, "meu-qrcode");
    assert.equal(checkoutOutput.id, "123");
    assert.equal(checkoutOutput.orderId, "1");
})