import {describe, expect, test, vi} from 'vitest';
import CreateCustomer from '@src/useCase/customer/createCustomer.usecase';
import MemoryCustomerRepository from '@src/repository/MemoryRepository/MemoryCustomer.repository';

vi.mock('@repository/MemoryRepository/MemoryCustomer.repository', () => {
    const MemoryCustomerRepository = vi.fn();
    MemoryCustomerRepository.prototype.save = vi.fn((params) => {
        return params;
    });
    MemoryCustomerRepository.prototype.get = vi.fn((params) => {
        if(params.id === '1') {
            return {id: '1', name: 'João da Silva', cpf: '272.060.570-04'};
        } else {
            return null;
        }
    });
    return {default: MemoryCustomerRepository};
})

describe('UseCase Customer', () => {
    test('CreateCustomer', async () => {
        const customerRepository = new MemoryCustomerRepository();
        const createCustomer = new CreateCustomer(customerRepository);
        const inputCreateProduct = {
            id: '1',
            name: 'João da Silva',
            cpf: '272.060.570-04',
        }
        const response = await createCustomer.execute(inputCreateProduct);
        expect(response).toBeDefined();
    })
});