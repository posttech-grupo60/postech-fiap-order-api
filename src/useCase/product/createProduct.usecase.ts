import Product from "../../entity/product";
import IProductRepository from "../../repository/interfaces/product.interface";

interface InputCreateProduct {
    name: string;
    category: "LANCHE" | "ACOMPANHAMENTO" | "BEBIDA" | "SOBREMESA";
    price: number;
    images: string[];
    description: string;
};

export default class CreateProduct {
  constructor(private productRepository: IProductRepository) {}

  async execute(input: InputCreateProduct): Promise<Product> {
    const { name, description, price, images, category } = input;
    const product = new Product({
      name,
      description,
      price,
      images,
      category
    });

    return await this.productRepository.save(product);
  }
}


  