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
    const product = new Product(
      null,
      input.name,
      input.description,
      input.price,
      input.images,
      input.category
    );

    return await this.productRepository.save(product);
  }
}


  