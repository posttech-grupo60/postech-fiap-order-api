import ProductAdapter from '@src/adapter/ProductAdapter';
import Product from '@src/entity/product';
import {describe, expect, test} from 'vitest';

describe('Adapter Product', () => {
    test('Should create convert object to Customer', () => {
        const response = ProductAdapter.create({
            id: 1,
            name: "Hamburguer",
            category: "LANCHE",
            description: "Hamburguer de carne",
            images: ["https://www.google.com"],
            price: 10,
        });
        expect(response).toBeInstanceOf(Product);
        expect(response.id).toBe(1);
        expect(response.name).toBe('Hamburguer');
        expect(response.category).toBe('LANCHE');
        expect(response.description).toBe('Hamburguer de carne');
        expect(response.images.length).toBe(1);
        expect(response.price).toBe(10);
        
    });
});