import Customer from "./customer";
import Product from "./product";

export default class Order {
  id?: number;
  customer: Customer;
  items: ProductAndQuantity[];
  status: OrderStatus;
  createdAt: Date;

  constructor({id, customer, items}: ContructorOrder) {
    this.id = id;
    this.customer = customer;
    this.items = items;
    this.status = OrderStatus.RECEIVED;
    this.createdAt = new Date();
  }

  setId(id: number) {
    this.id = id;
  }

  setStatus(status: OrderStatus) {
    this.status = status;
  }

  getTotal() {
    return this.items.reduce((acc, item) => {
      return acc + (item.product.price * item.quantity);
    }, 0);
  }
}
type ContructorOrder = {
  id?: number,
  customer: Customer,
  items: ProductAndQuantity[]
}

export type ProductAndQuantity = {
  product: Product;
  quantity: number;
};

export enum OrderStatus {
  RECEIVED = "received",
  WAITING_PAYMENT = "WAITING_PAYMENT",
  FINISHED = "finished",
}
