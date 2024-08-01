import {describe, expect, test} from 'vitest';
import MongoProductRepository from '../../../../src/repository/MongoRepository/product.repository';

describe('Memory Repository Product', () => {
    test('Should create an instance of repository', () => {
        const memoryProductRepository = new MongoProductRepository();
        expect(memoryProductRepository).toBeInstanceOf(MongoProductRepository);
    });
});