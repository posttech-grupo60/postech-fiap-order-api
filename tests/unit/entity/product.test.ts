import {describe, expect, test} from 'vitest';
import Product from '../../../src/entity/product';

describe('Entity Product', () => {
    test('Should create product', () => {
        const product = new Product({
            id: 1,
            name: 'Hamburger',
            description: 'Delicious hamburger',
            price: 10.99,
            images: ['image1.jpg', 'image2.jpg'],
            category: 'LANCHE'
        });
    
        expect(product.id).toBe(1);
        expect(product.name).toBe('Hamburger');
        expect(product.description).toBe('Delicious hamburger');
        expect(product.price).toBe(10.99);
        expect(product.images).toEqual(['image1.jpg', 'image2.jpg']);
        expect(product.category).toBe('LANCHE');
    
        product.setID(2);
        expect(product.id).toBe(2);
    });

    test('Should set id of product', () => {
        const product = new Product({
            id: 1,
            name: 'Hamburger',
            description: 'Delicious hamburger',
            price: 10.99,
            images: ['image1.jpg', 'image2.jpg'],
            category: 'LANCHE'
        });
    
        product.setID(2);
        expect(product.id).toBe(2);
    })
});