/* c8 ignore start */
import { Schema, model } from "mongoose";

export interface IProductModel {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
}

const productSchema = new Schema<IProductModel>({
  id: { type: Number, unique: true, index: true, default: 0 },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  images: Array,
  category: { type: String, required: true },
});

productSchema.pre("save", async function (next) {
  const maxId = await ProductModel.findOne().sort({ id: -1 }).limit(1);
  const nextId = maxId ? maxId.id + 1 : 1;
  this.id = nextId;
  next();
});

export const ProductModel = model<IProductModel>("Product", productSchema);
