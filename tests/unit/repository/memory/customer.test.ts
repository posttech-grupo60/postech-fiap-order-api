import {describe, expect, test} from 'vitest';
import MemoryCustomerRepository from '../../../../src/repository/MemoryRepository/MemoryCustomer.repository';
import Customer from '@src/entity/customer';
import CPF from '@src/entity/value-objects/cpf';

describe('Memory Repository Product', () => {
    test('Should create an instance of repository', () => {
        const memoryCustomerRepository = new MemoryCustomerRepository();
        expect(memoryCustomerRepository).toBeInstanceOf(MemoryCustomerRepository);
        expect(memoryCustomerRepository).toHaveProperty('get');
    });

    test('Should create customer', async () => {
        const memoryCustomerRepository = new MemoryCustomerRepository();
        const newCustomer = new Customer({id: 1,name: 'João da Silva',cpf: new CPF('819.987.999-80')});
        const response = await memoryCustomerRepository.save(newCustomer);
        expect(response.id).toEqual(newCustomer.id);
        expect(response.cpf?.get()).toEqual(newCustomer.cpf?.get());
        expect(response.name).toEqual(newCustomer.name);

    });
    
    test('Should get product by id', async () => {
        const memoryCustomerRepository = new MemoryCustomerRepository();
        const newCustomer1 = new Customer({id: 1, name: 'João da Silva', cpf: new CPF('819.987.999-80')});
        const newCustomer2 = new Customer({id: 1,name: 'João da Silva', cpf: new CPF('777.637.071-19')});
        await memoryCustomerRepository.save(newCustomer1);
        await memoryCustomerRepository.save(newCustomer2);
        const customer1 = await memoryCustomerRepository.get({id: 1});
        expect(customer1.name).toEqual(newCustomer1.name);
        const customer2 = await memoryCustomerRepository.get({cpf: '777.637.071-19'});
        expect(customer2.name).toEqual(newCustomer1.name);
        const customerNotFound = async () => {
            return await memoryCustomerRepository.get({id:3})
        };
        await expect(async () => await customerNotFound()).rejects.toThrowError("Customer not found");
    });
});