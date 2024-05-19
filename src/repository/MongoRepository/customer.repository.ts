import { CustomerModel } from "./schemas/Customer";
import ICustomerRepository from "../interfaces/customer.interface";
import CustomerAdapter from "@src/adapter/CustomerAdapter";
import Customer from "@src/entity/customer";

export default class MongoDBCustomerRepository implements ICustomerRepository {
  async get({ cpf, id }: { cpf?: string; id?: number }): Promise<Customer> {
    let customer;
    if (cpf) {
      cpf = cpf.replace(/[^\d]+/g, "");
      customer = await CustomerModel.findOne({ cpf });
    }
    if (id)
      customer = await CustomerModel.findOne({
        id,
      });
    if (!customer) throw new Error(`Customer not found!`);
    return CustomerAdapter.create({
      id: customer.id,
      name: customer.name,
      cpf: customer.cpf,
    });
  }

  async save(customer: Customer): Promise<Customer> {
    const queryCustomer = await CustomerModel.findOne({
      cpf: customer?.cpf?.get(),
    });
    if (queryCustomer) throw new Error("Customer already registered.");
    await new CustomerModel({ ...customer, cpf: customer?.cpf?.get() }).save();
    return customer;
  }
}
