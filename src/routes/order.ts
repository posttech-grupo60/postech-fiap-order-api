/* c8 ignore start */
/* eslint-disable @typescript-eslint/no-explicit-any */
import PaymentGateway from '@src/gateway/payment.gateway';
import MongoDBCustomerRepository from '@src/repository/MongoRepository/customer.repository';
import MongoDBOrderRepository from '@src/repository/MongoRepository/order.repository';
import MongoDBProductRepository from '@src/repository/MongoRepository/product.repository';
import Checkout from '@src/useCase/order/checkout.usecase';
import ListOrders from '@src/useCase/order/listOrders.usecase';
import {Router} from 'express';

const router = Router();

router.post('/checkout', async (req, res) => {
    try {
        const orderRepository = new MongoDBOrderRepository();
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
        const orderRepository = new MongoDBOrderRepository();
        const listOrders = new ListOrders(orderRepository);
        const orders = await listOrders.execute();
        return res.status(200).json(orders);
    } catch (error: any) {
        return res.status(500).json({message: 'Erro ao obter lista de pedidos, contate a administração', status: 500});
    }
});

export default router;