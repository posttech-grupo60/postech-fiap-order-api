import {describe, expect, test} from 'vitest';
import MongoCustomerRepository from '../../../../src/repository/MongoRepository/customer.repository';

describe('Memory Repository Product', () => {
    test('Should create an instance of repository', () => {
        const memoryCustomerRepository = new MongoCustomerRepository();
        expect(memoryCustomerRepository).toBeInstanceOf(MongoCustomerRepository);
        expect(memoryCustomerRepository).toHaveProperty('get');
    });
});