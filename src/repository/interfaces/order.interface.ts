import Order from "@src/entity/order";

export default interface IOrderRepository {
  save(order: Order): Promise<Order>;
  list(): Promise<Order[]>;
  findById(id: number): Promise<Order>;
  update(order: Order): Promise<Order>;
}
