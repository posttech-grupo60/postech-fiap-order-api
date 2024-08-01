import Product from "../../entity/product";
import IProductRepository from "../../repository/interfaces/product.interface";

interface InputGetProductById {
    id: number
}

export default class GetProductById {
  constructor(private productRepository: IProductRepository) {}
  async execute(params: InputGetProductById): Promise<Product> {
    const product = await this.productRepository.get(params.id);
    if(!product) throw new Error('Product not found');
    return product;
  }
}


  