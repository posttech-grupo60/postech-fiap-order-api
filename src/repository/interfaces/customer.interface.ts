import Customer from "@src/entity/customer";

export default interface ICustomerRepository {
  get(input: InputGet): Promise<Customer>;
  save(customer: Customer): Promise<Customer>;
  delete(cpf: string): Promise<void>;
}

type InputGet = {
  cpf?: string;
  id?: number;
};
