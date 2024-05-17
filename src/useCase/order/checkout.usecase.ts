import Order from "../../entity/order";
import IOrderRepository from "@src/repository/interfaces/order.interface";
import ICustomerRepository from "@src/repository/interfaces/customer.interface";
import IProductRepository from "@src/repository/interfaces/product.interface";
import { IPaymentGateway } from "@src/gateway/interfaces/payment.interface";

export default class Checkout {
  constructor(
    readonly orderRepository: IOrderRepository,
    readonly customerRepository: ICustomerRepository,
    readonly productRepository: IProductRepository,
    readonly paymentGateway: IPaymentGateway
  ) {}

  async execute(input: InputCheckout): Promise<OutputCheckout> {
    const { products, customerId } = input;
    const customer = await this.customerRepository.get({ id: customerId });
    if (!customer) throw new Error("Customer not found!");

    if (products.length === 0) throw new Error("Empty cart!");

    const itemsAndQuantities = await Promise.all(
      products.map(async (productAndQuantity) => {
        const { id, quantity } = productAndQuantity;
        if (quantity < 1)
          throw new Error("Product must have at least one unity!");
        const product = await this.productRepository.get(id);
        if (!product) throw new Error("Product not found");
        return {
          product,
          quantity,
        };
      })
    );
    const order = new Order({customer, items: itemsAndQuantities});
    const orderProcessed = await this.orderRepository.save(order);
    if(!orderProcessed.id) throw new Error("Error to process order");
    const paymentInfo = await this.paymentGateway.createPayment(
      {
        price: orderProcessed.getTotal(),
        orderId: String(orderProcessed.id),
      }
    );
    return paymentInfo;
  }
}

type InputCheckout = {
  customerId: number;
  products: {
    id: number;
    quantity: number;
  }[];
};

type OutputCheckout = {
    orderId: string;
	price: number;
	pay: boolean;
	qrCode: string;
	id: string;
}