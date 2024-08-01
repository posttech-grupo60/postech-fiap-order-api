export default class Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: "LANCHE" | "ACOMPANHAMENTO" | "BEBIDA" | "SOBREMESA";

  constructor({ id, name, description, price, images, category }: ConstructorProduct) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.price = price;
    this.images = images;
    this.category = category;
  }

  setID = (id: number) => {
    this.id = id;
  };
}

type ConstructorProduct = {
  id?: number,
  name: string,
  description: string,
  price: number,
  images: string[],
  category: "LANCHE" | "ACOMPANHAMENTO" | "BEBIDA" | "SOBREMESA"
}
