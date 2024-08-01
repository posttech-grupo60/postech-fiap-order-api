import IOrderRepository from "@src/repository/interfaces/order.interface";
import Order, { OrderStatus } from "../../entity/order";

export default class ListOrders {
  constructor(readonly orderRepository: IOrderRepository) {}

  async execute(): Promise<Order[]> {
    const orders = await this.orderRepository.list();
    const ordersReady = orders
      .filter((order) => order.status === OrderStatus.RECEIVED)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    const ordersPreparation = orders
      .filter((order) => order.status === OrderStatus.WAITING_PAYMENT)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    const ordersReceived = orders
      .filter((order) => order.status === OrderStatus.FINISHED)
      .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
    return [...ordersReady, ...ordersPreparation, ...ordersReceived];
  }
}
