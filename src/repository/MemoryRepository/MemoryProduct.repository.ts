import Product from "../../entity/product";
import IProductRepository from "@src/repository/interfaces/product.interface";

export default class MemoryProductRepository implements IProductRepository {
  private products: Product[] = [];

  async list(category?: string): Promise<Product[]> {
    if (!category) return this.products;
    return this.products.filter((product) => product.category === category);
  }

  async get(id: number): Promise<Product> {
    const product = this.products.find((product) => product.id === id);
    if (!product) throw new Error("Product not found");
    return product;
  }

  async save(product: Product): Promise<Product> {
    product.setID(this.products.length + 1);
    this.products.push(product);
    return product;
  }

  async update(product: Product): Promise<void> {
    const productIndex = this.products.findIndex((p) => p.id === product.id);
    if (productIndex === -1) throw new Error("Product not found");
    this.products[productIndex] = product;
  }

  async remove(id: number): Promise<void> {
    const productIndex = this.products.findIndex((p) => p.id === id);
    if (productIndex === -1) throw new Error("Product not found");
    this.products.splice(productIndex, 1);
  }
}