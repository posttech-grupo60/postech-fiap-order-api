import Product from "../../entity/product";

export default interface IProductRepository {
  list(category?: string): Promise<Product[]>;
  get(id: number): Promise<Product>;
  save(product: Product): Promise<Product>;
  update(product: Product): Promise<void>;
  remove(id: number): Promise<void>;
}