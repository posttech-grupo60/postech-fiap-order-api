/* c8 ignore start */
import Customer from "@src/entity/customer";
import Product from "@src/entity/product";
import { Schema, model } from "mongoose";

export interface IOrderModel {
  id: number;
  status: string;
  customer: Customer;
  items: {
    product: Product;
    quantity: number;
  }[];
}

const orderSchema = new Schema<IOrderModel>({
  id: { type: Number, unique: true, index: true, default: 0 },
  status: { type: String, required: true },
  customer: { type: Object, required: true },
  items: Array,
});

orderSchema.pre("save", async function (next) {
  const maxId = await OrderModel.findOne().sort({ id: -1 }).limit(1);
  const nextId = maxId ? maxId.id + 1 : 1;
  this.id = nextId;
  next();
});

export const OrderModel = model<IOrderModel>("Order", orderSchema);
