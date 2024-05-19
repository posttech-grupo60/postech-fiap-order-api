import {describe, expect, test, vi} from 'vitest';
import MemoryProductRepository from '@repository/MemoryRepository/MemoryProduct.repository';
import GetProductById from '@src/useCase/product/getProductById.usecase';

vi.mock('@repository/MemoryRepository/MemoryProduct.repository', () => {
    const MemoryProductRepository = vi.fn();
    MemoryProductRepository.prototype.get = vi.fn((params) => {
        if(params === 1) {
            return {name: 'Hamburguer', category: 'LANCHE', price: 12, images: ['imgs.png'], description: 'Hambuguer de carne com queijo e salada.'};
        }else {
            return null;
        }
    });
    return {default: MemoryProductRepository};
})

describe('UseCase Product', () => {
    test('Get valid product', async () => {
        const productRepository = new MemoryProductRepository();
        const createProduct = new GetProductById(productRepository);
        const response = await createProduct.execute({id: 1});
        expect(response).toBeDefined();
        expect(response.name).toEqual('Hamburguer');
        expect(response.price).toEqual(12);
        
    })
    test('Get invalid product', async () => {
        const productRepository = new MemoryProductRepository();
        const createProduct = new GetProductById(productRepository);
        await expect(async () => await createProduct.execute({id: 3})).rejects.toThrowError("Product not found");
    })
});