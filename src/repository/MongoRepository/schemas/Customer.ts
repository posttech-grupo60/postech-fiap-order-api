/* c8 ignore start */
import { Schema, model } from "mongoose";

export interface ICustomerModel {
  id: number;
  name: string;
  cpf: string;
}

const customerSchema = new Schema<ICustomerModel>({
  id: { type: Number, unique: true, index: true, default: 0 },
  name: { type: String, required: true },
  cpf: { type: String, required: true, unique: true },
});

customerSchema.pre("save", async function (next) {
  const maxId = await CustomerModel.findOne().sort({ id: -1 }).limit(1);
  const nextId = maxId ? maxId.id + 1 : 1;
  this.id = nextId;
  next();
});

export const CustomerModel = model<ICustomerModel>("Customer", customerSchema);