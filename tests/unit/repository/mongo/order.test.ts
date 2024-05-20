import {beforeAll, describe, expect, test} from 'vitest';
import MongoOrderRepository from '../../../../src/repository/MongoRepository/order.repository';

describe('Memory Repository Order', () => {
    let mongoOrderRepository: MongoOrderRepository;
    beforeAll(async () => {
        mongoOrderRepository = new MongoOrderRepository();
    });

    test('Should create an order of repository', () => {
        expect(mongoOrderRepository).toBeInstanceOf(MongoOrderRepository);
        expect(mongoOrderRepository).toHaveProperty('save');
    });
});