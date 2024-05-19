import CustomerAdapter from '@src/adapter/CustomerAdapter';
import Customer from '@src/entity/customer';
import {describe, expect, test} from 'vitest';

describe('Adapter Customer', () => {
    test('Should create convert object to Customer', () => {
        const response = CustomerAdapter.create({
            id: 1,
            name: 'John Doe',
            cpf: '24454136211',
        });
        expect(response).toBeInstanceOf(Customer);
        expect(response.id).toBe(1);
        expect(response.name).toBe('John Doe');
        expect(response.cpf?.get()).toBe('24454136211');
    });
});