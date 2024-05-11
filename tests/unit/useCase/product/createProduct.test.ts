import {describe, expect, test, vi} from 'vitest';
import CreateProduct from '@useCase/product/createProduct.usecase';
import MemoryProductRepository from '@repository/MemoryRepository/MemoryProduct.repository';

vi.mock('@repository/MemoryRepository/MemoryProduct.repository', () => {
    const MemoryProductRepository = vi.fn();
    MemoryProductRepository.prototype.save = vi.fn((params) => {
        return params;
    });
    return {default: MemoryProductRepository};
})

describe('UseCase Product', () => {
    test('CreateProduct', async () => {
        const productRepository = new MemoryProductRepository();
        const createProduct = new CreateProduct(productRepository);
        const inputCreateProduct = {
            name: 'Hambuguer',
            category: 'LANCHE' as 'LANCHE' | 'BEBIDA' | 'SOBREMESA',
            price: 12,
            images: ['imgs.png'],
            description: 'Hambuguer de carne com queijo e salada.'
        }
        const response = await createProduct.execute(inputCreateProduct);
        expect(response).toBeDefined();
        expect(response.name).toEqual(inputCreateProduct.name);
        expect(response.category).toEqual(inputCreateProduct.category);
        expect(response.price).toEqual(inputCreateProduct.price);
        expect(response.images).toEqual(inputCreateProduct.images);
        expect(response.description).toEqual(inputCreateProduct.description);
        
    })
});