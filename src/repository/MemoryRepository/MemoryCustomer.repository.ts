import Customer from "@src/entity/customer";
import ICustomerRepository from "../interfaces/customer.interface";

export default class MemoryCustomerRepository implements ICustomerRepository {
  private customer: Customer[] = [];

  async get({ cpf, id }: { cpf?: string; id?: number }): Promise<Customer> {
    let customer;
    if (cpf) {
      cpf = cpf.replace(/[^\d]+/g, "");
      customer = this.customer.find((customer) => customer?.cpf?.get() === cpf);
    }
    if (id) customer = this.customer.find((customer) => customer.id === id);
    if (!customer) throw new Error(`Customer not found!`);
    return customer;
  }

  async save(customer: Customer): Promise<Customer> {
    customer.setId(this.customer.length + 1);
    this.customer.push(customer);
    return customer;
  }
  async delete(cpf: string): Promise<void> {
    this.customer = this.customer.filter((customer) => customer?.cpf?.get() !== cpf);
  }
}
