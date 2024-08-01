import Product from "../../entity/product";
import IProductRepository from "../../repository/interfaces/product.interface";

export default class ListAllProducts {
  constructor(private productRepository: IProductRepository) {}

  async execute(): Promise<Product[]> {
    return await this.productRepository.list();
  }
}


  