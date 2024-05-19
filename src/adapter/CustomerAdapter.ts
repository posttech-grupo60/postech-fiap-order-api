import Customer from "@src/entity/customer";
import CPF from "@src/entity/value-objects/cpf";

export default class CustomerAdapter {
  static create({ id, name, cpf }: InputCreate): Customer {
    return new Customer({id, name, cpf: new CPF(cpf)});
  }
}

type InputCreate = {
  id?: number;
  name: string;
  cpf: string;
};
