import {describe, expect, test, vi} from 'vitest';
import MemoryCustomerRepository from '@src/repository/MemoryRepository/MemoryCustomer.repository';
import GetCustomer from '@src/useCase/customer/getCustomer.usecase';

vi.mock('@repository/MemoryRepository/MemoryCustomer.repository', () => {
    const MemoryCustomerRepository = vi.fn();
    MemoryCustomerRepository.prototype.save = vi.fn((params) => {
        return params;
    });
    MemoryCustomerRepository.prototype.get = vi.fn((params) => {
        if(params.id === 1) {
            return {id: 1, name: 'João da Silva', cpf: '272.060.570-04'};
        } else {
            return null;
        }
    });
    return {default: MemoryCustomerRepository};
})

describe('UseCase Customer', () => {
    test('GetCustomer', async () => {
        const customerRepository = new MemoryCustomerRepository();
        const createCustomer = new GetCustomer(customerRepository);
        const response = await createCustomer.execute({
            id: 1
        });
        expect(response).toBeDefined();
        expect(response.id).toBe(1);
        expect(response.name).toBe('João da Silva');
        
        expect(async () => await createCustomer.execute({id: 2}))
            .rejects
            .toThrow('CUSTOMER_NOT_FOUND');
    })
});


