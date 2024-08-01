import {describe, expect, test, vi} from 'vitest';
import MemoryProductRepository from '@repository/MemoryRepository/MemoryProduct.repository';
import DeleteProduct from '@src/useCase/product/deleteProduct.usecase';

vi.mock('@repository/MemoryRepository/MemoryProduct.repository', () => {
    const MemoryProductRepository = vi.fn();
    MemoryProductRepository.prototype.remove = vi.fn(() => {
        return undefined;
    });
    return {default: MemoryProductRepository};
})

describe('UseCase Product', () => {
    test('Delete product', async () => {
        const productRepository = new MemoryProductRepository();
        const createProduct = new DeleteProduct(productRepository);
        const response = await createProduct.execute({id: 1});
        expect(response).toBeUndefined();
    })
});