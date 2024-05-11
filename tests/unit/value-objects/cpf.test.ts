import {describe, expect, test} from 'vitest';
import CPF from '@src/entity/value-objects/cpf';

describe('Value Object CPF', () => {
    test('Should create valid cpf', () => {
        const cpf = new CPF('191.639.050-19')
        expect(cpf.get()).toBe('19163905019');
    });

    test('Should throw error on invalid cpf', () => {
        expect(() => new CPF('000.000.000-0')).toThrowError('INVALID_CPF');
        expect(() => new CPF('000.000.000-00')).toThrowError('INVALID_CPF');
        expect(() => new CPF('000.000.000-01')).toThrowError('INVALID_CPF');
        expect(() => new CPF('123.000.000-01')).toThrowError('INVALID_CPF');
        expect(() => new CPF('111.111.112-11')).toThrowError('INVALID_CPF');
        expect(() => new CPF('620.687.348-03')).toThrowError('INVALID_CPF');
    });
});

