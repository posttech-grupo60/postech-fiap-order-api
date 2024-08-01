import Customer from "@src/entity/customer";
import Order, { ProductAndQuantity } from "@src/entity/order";

export default class OrderAdapter {
  static create({ id, customer, productsAndQuantity }: InputCreate) {
    return new Order({id, customer, items: productsAndQuantity});
  }
}

type InputCreate = {
  id: number;
  customer: Customer;
  productsAndQuantity: ProductAndQuantity[];
};
