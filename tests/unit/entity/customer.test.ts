import {describe, expect, test} from 'vitest';
import Customer from '@src/entity/customer';
import CPF from '@src/entity/value-objects/cpf';

describe('Entity Customer', () => {
    test('Should create customer', () => {
        const customer = new Customer(
            '1',
            'João da Silva',
            new CPF('191.639.050-19')
        );
    
        expect(customer.id).toBe('1');
        expect(customer.name).toBe('João da Silva');
        expect(customer.cpf.get()).toBe('19163905019');
    });
});

