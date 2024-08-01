import ICustomerRepository from "@src/repository/interfaces/customer.interface";
import CPF from "../../entity/value-objects/cpf";

export default class CreateCustomer {
  constructor(readonly customerRepository: ICustomerRepository) {}

  async execute(input: Input) {
    return await this.customerRepository.delete(
      new CPF(input.cpf).get()
    );
  }
}

type Input = {
  cpf: string;
};
