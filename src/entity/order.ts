import Customer from "./customer";
import Product from "./product";

export default class Order {
  id?: string | null;
  status: OrderStatus;
  createdAt: Date;

  constructor(
    id: null | string,
    readonly customer: Customer,
    readonly items: ProductAndQuantity[]
  ) {
    this.id = id;
    this.status = OrderStatus.RECEIVED;
    this.createdAt = new Date();
  }

  setId(id: string) {
    this.id = id;
  }

  setStatus(status: OrderStatus) {
    this.status = status;
  }
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
