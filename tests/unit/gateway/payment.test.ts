import {describe, expect, test, vi} from 'vitest';
import PaymentGateway from '@src/gateway/payment.gateway';

vi.mock('axios', () => {
    return {
        default: {
            post: vi.fn().mockResolvedValue({
                data: {
                    "orderId": "1459660f-3779-446d-986d-24c1394d6281",
                    "price": 20.2,
                    "pay": false,
                    "qrCode": "0002011630002010102122653001418chave_pix_recebedo5204000053039865406undefined20.25802BR59134Fiap60079São Paulo620705036304Transaction6235Gerador da ordem de teste-marcelo-4",
                    "id": "8787937f-8500-4f56-96cc-b19189eab0ee"
                }
            }),
            get: vi.fn().mockResolvedValue({
                data: {
                    "orderId": "1459660f-3779-446d-986d-24c1394d6281",
                    "price": 20.2,
                    "pay": false,
                    "qrCode": "0002011630002010102122653001418chave_pix_recebedo5204000053039865406undefined20.25802BR59134Fiap60079São Paulo620705036304Transaction6235Gerador da ordem de teste-marcelo-4",
                    "id": "8787937f-8500-4f56-96cc-b19189eab0ee"
                }
            })
        }
    }
})

describe('Gateway Payment', () => {
    test('Should create payment gateway', async () => {
        const paymentGateway = new PaymentGateway();
        expect(paymentGateway).toBeDefined();

        const response = await paymentGateway.createPayment({
            price: 20.2,
            orderId: "1459660f-3779-446d-986d-24c1394d6281"
        });
        expect(response.id).toBeDefined();
        expect(response.price).toBe(20.2);
        expect(response.orderId).toBe("1459660f-3779-446d-986d-24c1394d6281");
    })    
});

describe('Gateway Payment', () => {
    test('Should get payment gateway', async () => {
        const paymentGateway = new PaymentGateway();
        expect(paymentGateway).toBeDefined();

        const response = await paymentGateway.getPayment("1459660f-3779-446d-986d-24c1394d6281");
        expect(response.id).toBeDefined();
        expect(response.price).toBe(20.2);
        expect(response.orderId).toBe("1459660f-3779-446d-986d-24c1394d6281");
    })    
});

