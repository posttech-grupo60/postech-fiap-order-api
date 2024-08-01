import Product from "@src/entity/product";
import IProductRepository from "../interfaces/product.interface";
import { ProductModel } from "./schemas/Product";
import ProductAdapter from "@src/adapter/ProductAdapter";

export default class MongoDBProductRepository implements IProductRepository {
  async list(category?: string ): Promise<Product[]> {
    const query: { category?: string } = {};
    if (category) {
      query.category = category;
    }
    const productsFound = await ProductModel.find(query);
    return productsFound.map((product) =>
      ProductAdapter.create({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        images: product.images,
        category: product.category,
      })
    );
  }

  async get(id: number): Promise<Product> {
    const productFound = await ProductModel.findOne({ id });
    if (!productFound) throw new Error("Produto não encontrado!");
    return ProductAdapter.create({
      id: productFound.id,
      name: productFound.name,
      description: productFound.description,
      price: productFound.price,
      images: productFound.images,
      category: productFound.category,
    });
  }

  async save(product: Product): Promise<Product> {
    try {
      await new ProductModel({ ...product }).save();
      return product;
    } catch (error) {
      throw new Error("Erro ao inserir produto: " + error);
    }
  }

  async update(product: Product) {
    try {
      await ProductModel.findOneAndUpdate({ id: product.id }, product);
    } catch (error) {
      throw new Error("Erro ao atualizar produto: " + error);
    }
  }

  async remove(id: number) {
    await ProductModel.deleteOne({ id });
  }
}
