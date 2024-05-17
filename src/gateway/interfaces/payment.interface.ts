export interface IPaymentGateway {
    createPayment(paymentInfo: InputCreatePayment): Promise<OutputCreatePayment>;
	getPayment(orderId: string): Promise<OutputGetPayment>;
}

export type InputCreatePayment = {
    price: number;
    orderId: string;
}

export type OutputCreatePayment = {
	orderId: string;
	price: number;
	pay: boolean;
	qrCode: string;
	id: string;
}

export type OutputGetPayment = {
	orderId: string,
	price: number,
	pay: boolean,
	id: string,
	qrCode: string
}