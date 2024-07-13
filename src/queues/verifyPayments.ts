import PaymentGateway from "@src/gateway/payment.gateway";
import ProductionGateway from "@src/gateway/production.gateway";
import MongoDBOrderRepository from "@src/repository/MongoRepository/order.repository";
import VerifyPayment from "@src/useCase/order/verifyPayment.usecase";
import envs from "@src/utils/envs";
import * as AWS from "aws-sdk";
const timeout = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const verifyPaymentQueue = async () => {
  try {
    const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });
    const orderRepository = new MongoDBOrderRepository();
    const paymentGateway = new PaymentGateway();
    const productionGateway = new ProductionGateway();
    const verifyPayment = new VerifyPayment(
      orderRepository,
      paymentGateway,
      productionGateway
    );
    // eslint-disable-next-line no-constant-condition
    while (true) {
      sqs.receiveMessage(
        {
          AttributeNames: ["SentTimestamp"],
          MaxNumberOfMessages: 10,
          MessageAttributeNames: ["All"],
          QueueUrl: String(envs.QUEUE_RESULT_PAYMENT),
          VisibilityTimeout: 20,
          WaitTimeSeconds: 0,
        },
        async (err, data) => {
          if (err) {
            console.log("Receive Error", err);
          } else if (data.Messages) {
            const parsedMessages = data.Messages.map((message) => {
              if (!message.Body) return {};
              return JSON.parse(message.Body);
            });

            parsedMessages.forEach(async (message) => {
              await verifyPayment.execute({ ...message });
            });

            const messagesToDelete = data.Messages.map((message) => {
              return {
                QueueUrl: String(process.env.QUEUE_RESULT_PAYMENT),
                ReceiptHandle: message.ReceiptHandle ?? "",
              };
            });

            await Promise.all(
              messagesToDelete.map(async (message) => {
                return await sqs.deleteMessage(message).promise();
              })
            );
          }
        }
      );
      await timeout(5000);
    }
  } catch (err) {
    console.log(err);
  }
};
