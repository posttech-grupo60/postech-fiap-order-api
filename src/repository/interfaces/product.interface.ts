import Product from "../../entity/product";

export default interface IProductRepository {
  list(category?: string): Promise<Product[]>;
  get(id: string): Promise<Product>;
  save(product: Product): Promise<Product>;
  update(product: Product): Promise<void>;
  remove(id: string): Promise<void>;
}