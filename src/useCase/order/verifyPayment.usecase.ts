import IOrderRepository from "@src/repository/interfaces/order.interface";
import { IPaymentGateway } from "@src/gateway/interfaces/payment.interface";
import { IProductionGateway } from "@src/gateway/interfaces/production.interface";

export default class VerifyPayment {
  constructor(
    readonly orderRepository: IOrderRepository,
    readonly paymentGateway: IPaymentGateway,
    readonly productionGateway: IProductionGateway
  ) {}

  async execute(input: InputVerifyPayment): Promise<boolean> {
    const { orderId, pay } = input;
    if (!pay) return false;
    const order = await this.orderRepository.findById(orderId);
    if (!order?.id) throw new Error("Order not found!");
    if (!order?.customer?.id) throw new Error("Invalid customer!");
    await this.productionGateway.send({
      id: order.id,
      customerId: order?.customer?.id,
      productQuantity: order.items.map((item, index) => ({
        id: index,
        product: {
          productId: item?.product?.id ?? 0,
          name: item.product.name,
          description: item.product.description,
          price: item.product.price,
          category: item.product.category as string,
        },
        quantity: item.quantity,
      })),
    });
    return true;
  }
}

type InputVerifyPayment = {
  orderId: number;
  pay: boolean;
};
