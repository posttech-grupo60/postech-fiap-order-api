import axios from 'axios';
import envs from '../utils/envs'
import { IPaymentGateway, InputCreatePayment, OutputCreatePayment } from './interfaces/payment.interface';

export default class PaymentGateway implements IPaymentGateway {
    async createPayment(paymentInfo: InputCreatePayment): Promise<OutputCreatePayment> {
        const {data} = await axios.post<OutputCreatePayment>(`${envs.URL_PAYMENT_GATEWAY}/generatePayment`, paymentInfo);
        return {...data}
    }

    async getPayment(orderId: string): Promise<OutputCreatePayment> {
        const {data} = await axios.get<OutputCreatePayment>(`${envs.URL_PAYMENT_GATEWAY}/searchPaymentByOrderId/${orderId}`);
        return {...data}
    }
}
