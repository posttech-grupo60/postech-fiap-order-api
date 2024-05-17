export interface IProductionGateway {
    send(orderInfo: InputSendToProduction): Promise<void>;
}

export type InputSendToProduction = {
    id: number;
    customerId: number;
	productQuantity: Array<{
		id: number;
		product: {
			productId: number;
			name: string;
			description: string;
			price: number;
			category: string;
		};
		quantity: number;
	}>;
}