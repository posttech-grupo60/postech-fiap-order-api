import axios from "axios";
import envs from "../utils/envs";
import {
  IPaymentGateway,
  InputCreatePayment,
  OutputCreatePayment,
} from "./interfaces/payment.interface";

import * as AWS from "aws-sdk";

AWS.config.update({ region: "us-east-1" });

const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

export default class PaymentGateway implements IPaymentGateway {
  async createPayment(
    paymentInfo: InputCreatePayment
  ): Promise<void> {
    await sqs
      .sendMessage({
        DelaySeconds: 10,
        MessageBody: JSON.stringify(paymentInfo),
        QueueUrl: envs.QUEUE_CREATE_PAYMENT,
      })
      .promise();
  }

  async getPayment(orderId: string): Promise<OutputCreatePayment> {
    const { data } = await axios.get<OutputCreatePayment>(
      `${envs.URL_PAYMENT_GATEWAY}/searchPaymentByOrderId/${orderId}`
    );
    return { ...data };
  }
}
