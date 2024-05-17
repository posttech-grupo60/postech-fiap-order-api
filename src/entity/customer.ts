import CPF from "./value-objects/cpf";

export default class Customer {
  id?: number;
  name?: string;
  cpf?: CPF;
  
  constructor({id, name, cpf}: {id?: number; name: string; cpf: CPF}) {
    this.id = id;
    this.name = name;
    this.cpf = cpf;
  }
  
  setId(id: number) {
    this.id = id;
  }
}
