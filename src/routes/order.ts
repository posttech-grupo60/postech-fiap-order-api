/* c8 ignore start */
/* eslint-disable @typescript-eslint/no-explicit-any */
import PaymentGateway from '@src/gateway/payment.gateway';
import ProductionGateway from '@src/gateway/production.gateway';
import MongoDBCustomerRepository from '@src/repository/MongoRepository/customer.repository';
import MongoDBOrderrepository from '@src/repository/MongoRepository/order.repository';
import MongoDBProductRepository from '@src/repository/MongoRepository/product.repository';
import Checkout from '@src/useCase/order/checkout.usecase';
import ListOrders from '@src/useCase/order/listOrders.usecase';
import VerifyPayment from '@src/useCase/order/verifyPayment.usecase';
import {Router} from 'express';

const router = Router();

router.post('/checkout', async (req, res) => {
    try {
        const orderRepository = new MongoDBOrderrepository();
        const customerRepository = new MongoDBCustomerRepository();
        const productRepository = new MongoDBProductRepository();
        const paymentGateway = new PaymentGateway();
        const checkout = new Checkout(orderRepository,customerRepository,productRepository,paymentGateway);
        const response = await checkout.execute({...req.body});
        return res.status(200).json(response);
    } catch (error: any) {
        console.log("🚀 ~ router.post ~ error:", error)
        return res.status(500).json({message: 'Erro no checkout, contate a administração', status: 500});
    }
});

router.get('/', async (_, res) => {
    try {
        const orderRepository = new MongoDBOrderrepository();
        const listOrders = new ListOrders(orderRepository);
        const orders = await listOrders.execute();
        return res.status(200).json(orders);
    } catch (error: any) {
        return res.status(500).json({message: 'Erro ao obter lista de pedidos, contate a administração', status: 500});
    }
});

router.get('/:status', async (req, res) => {
    try {
        const orderRepository = new MongoDBOrderrepository();
        const paymentGateway = new PaymentGateway();
        const productionGateway = new ProductionGateway();
        const verifyPayment = new VerifyPayment(orderRepository,paymentGateway,productionGateway);
        const response = await verifyPayment.execute({...req.body});
        return res.status(200).json(response);
    } catch (error: any) {
        return res.status(500).json({message: 'Erro ao verificar pagamento, contate a administração', status: 500});
    }
});

export default router;