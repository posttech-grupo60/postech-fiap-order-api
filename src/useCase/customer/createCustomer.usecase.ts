import ICustomerRepository from "@src/repository/interfaces/customer.interface";
import Customer from "../../entity/customer";
import CPF from "../../entity/value-objects/cpf";

export default class CreateCustomer {
  constructor(readonly customerRepository: ICustomerRepository) {}

  async execute(input: Input) {
    return await this.customerRepository.save(
      new Customer({name: input.name, cpf: new CPF(input.cpf)})
    );
  }
}

type Input = {
  id: string;
  name: string;
  cpf: string;
};
