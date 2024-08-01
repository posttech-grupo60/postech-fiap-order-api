import IProductRepository from "../../repository/interfaces/product.interface";

interface InputDeleteProduct {
    id: number
}

export default class DeleteProduct {
  constructor(private productRepository: IProductRepository) {}
  async execute(params: InputDeleteProduct): Promise<void> {
    this.productRepository.remove(params.id);
  }
}


  