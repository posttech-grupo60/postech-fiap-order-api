import Product from "@src/entity/product";


export default class ProductAdapter {
  static create({
    id,
    name,
    description,
    price,
    images,
    category,
  }: InputCreate): Product {
    return new Product({id, name, description, price, images, category: category as "LANCHE" | "ACOMPANHAMENTO" | "BEBIDA" | "SOBREMESA"});
  }
}

type InputCreate = {
  id: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
};
