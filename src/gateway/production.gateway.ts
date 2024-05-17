import axios from 'axios';
import envs from '../utils/envs'
import { IProductionGateway, InputSendToProduction } from './interfaces/production.interface';

export default class ProductionGateway implements IProductionGateway {
    async send(orderInfo: InputSendToProduction): Promise<void> {
        await axios.post<void>(`${envs.URL_PRODUCTION_GATEWAY}/api-producao/order`, orderInfo);
    }
}
