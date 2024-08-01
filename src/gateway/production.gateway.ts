import envs from "../utils/envs";
import {
  IProductionGateway,
  InputSendToProduction,
} from "./interfaces/production.interface";
import * as AWS from "aws-sdk";

AWS.config.update({ region: "us-east-1" });

const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });
export default class ProductionGateway implements IProductionGateway {
  async send(orderInfo: InputSendToProduction): Promise<void> {
    await sqs
      .sendMessage({
        DelaySeconds: 10,
        MessageBody: JSON.stringify(orderInfo),
        QueueUrl: envs.QUEUE_PRODUCTION,
      })
      .promise();
  }
}
