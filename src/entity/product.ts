export default class Product {
  id?: string | null = null;
  constructor(
    id: string | null,
    readonly name: string,
    readonly description: string,
    readonly price: number,
    readonly images: string[],
    readonly category: "LANCHE" | "ACOMPANHAMENTO" | "BEBIDA" | "SOBREMESA"
  ) {
    this.id = id;
  }

  setID = (id: string) => {
    this.id = id;
  };
}
