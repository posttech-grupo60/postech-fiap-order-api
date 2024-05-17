import {describe, expect, test} from 'vitest';
import MemoryProductRepository from '../../../../src/repository/MemoryRepository/MemoryProduct.repository';
import Product from '../../../../src/entity/product';

describe('Memory Repository Product', () => {
    test('Should create an instance of repository', () => {
        const memoryProductRepository = new MemoryProductRepository();
        expect(memoryProductRepository).toBeInstanceOf(MemoryProductRepository);
        expect(memoryProductRepository).toHaveProperty('products');
    });

    test('Should insert and list products', async () => {
        const memoryProductRepository = new MemoryProductRepository();
        const productLanche = new Product({name: 'Hamburger', description: 'Delicious hamburger', price: 10.99, images: ['image1.jpg', 'image2.jpg'], category: 'LANCHE'});
    const productSobremesa = new Product({name: 'Pudim', description: 'Delicious pudim', price: 5.99, images: ['image1.jpg', 'image2.jpg'], category: 'SOBREMESA'});
        await memoryProductRepository.save(productLanche);
        await memoryProductRepository.save(productSobremesa);
        const getAllProducts = await memoryProductRepository.list();
        expect(getAllProducts.length).toEqual(2);
        expect(getAllProducts[0].name).toEqual(productLanche.name);
        expect(getAllProducts[0].price).toEqual(productLanche.price);
        const getProductsByCategory = await memoryProductRepository.list("SOBREMESA");
        expect(getProductsByCategory.length).toEqual(1);
        expect(getProductsByCategory[0].name).toEqual(productSobremesa.name);
        expect(getProductsByCategory[0].price).toEqual(productSobremesa.price);

    });
    
    test('Should get product by id', async () => {
        const memoryProductRepository = new MemoryProductRepository();
        const product = new Product({id: 1, name: 'Hamburger', description: 'Delicious hamburger', price: 10.99, images: ['image1.jpg', 'image2.jpg'], category: 'LANCHE'});
        await memoryProductRepository.save(product);
        const productFound = await memoryProductRepository.get(1);
        expect(productFound.id).toEqual(product.id);
        const productNotFound = async () => {
            return await memoryProductRepository.get(3)
        };
        await expect(async () => await productNotFound()).rejects.toThrowError("Product not found");
    });

    test('Should update product', async () => {
        const memoryProductRepository = new MemoryProductRepository();
        const product = new Product({id: 1, name: 'Hamburger', description: 'Delicious hamburger', price: 10.99, images: ['image1.jpg', 'image2.jpg'], category: 'LANCHE'});
        await memoryProductRepository.save(product);
        const productUpdated = new Product({id: 1, name: 'Hamburger', description: 'Delicious hamburger', price: 15.99, images: ['image1.jpg', 'image2.jpg'], category: 'LANCHE'});
        await memoryProductRepository.update(productUpdated);
        const productFound = await memoryProductRepository.get(1);
        expect(productFound.price).toEqual(productUpdated.price);
        const productNotFound = new Product({id: 3, name: 'Hamburger', description: 'Delicious hamburger', price: 15.99, images: ['image1.jpg', 'image2.jpg'], category: 'LANCHE'});
        const execProductNotFound = async () => {
            return await memoryProductRepository.update(productNotFound)
        };
        await expect(async () => await execProductNotFound()).rejects.toThrowError("Product not found");

    });

    test('Should remove product', async () => {
        const memoryProductRepository = new MemoryProductRepository();
        const product = new Product({id: 1, name: 'Hamburger', description: 'Delicious hamburger', price: 10.99, images: ['image1.jpg', 'image2.jpg'], category: 'LANCHE'});
        await memoryProductRepository.save(product);
        await memoryProductRepository.remove(1);
        const productNotFound = async () => {
            return await memoryProductRepository.remove(1)
        };
        await expect(async () => await productNotFound()).rejects.toThrowError("Product not found");
    });
});