import {describe, expect, test, vi} from 'vitest';
import ProductionGateway from '@src/gateway/production.gateway';

vi.mock('axios', () => {
    return {
        default: {
            post: vi.fn().mockResolvedValue({
                data: {}
            })
        }
    }
})

describe('Gateway Production', () => {
    test('Should create a production gateway', async () => {
        const productionGateway = new ProductionGateway();
        expect(productionGateway).toBeDefined();

        
        expect(async () => await productionGateway.send({
            id: 1,
            customerId: 20,
            productQuantity: [
                {
                    id: 1,
                    product: {
                        productId: 1,
                        name: "Product 1",
                        description: "Product 1",
                        price: 20.2,
                        category: "Category 1"
                    },
                    quantity: 1
                }
            ]
        })).not.toThrowError();
    })    
});

