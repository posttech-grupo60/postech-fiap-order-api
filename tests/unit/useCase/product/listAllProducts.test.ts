import {describe, expect, test, vi} from 'vitest';
import MemoryProductRepository from '@repository/MemoryRepository/MemoryProduct.repository';
import ListAllProducts from '@src/useCase/product/listAllProducts.usecase';

vi.mock('@repository/MemoryRepository/MemoryProduct.repository', () => {
    const MemoryProductRepository = vi.fn();
    MemoryProductRepository.prototype.list = vi.fn(() => {
        return [
            {name: 'Hambuguer', category: 'LANCHE', price: 12, images: ['imgs.png'], description: 'Hambuguer de carne com queijo e salada.'},
            {name: 'Coca-cola', category: 'BEBIDA', price: 5, images: ['imgs.png'], description: 'Refrigerante de cola.'},
        ];
    });
    return {default: MemoryProductRepository};
})

describe('UseCase Product', () => {
    test('List Products', async () => {
        const productRepository = new MemoryProductRepository();
        const listAllProducts = new ListAllProducts(productRepository);
        const response = await listAllProducts.execute();
        expect(response).toBeDefined();
        expect(response.length).toEqual(2);
    })
});