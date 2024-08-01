/* c8 ignore start */
import "dotenv/config";
import express from "express";
import orderRoute from "./routes/order";
import productRoute from "./routes/product";
import customerRoute from "./routes/customer";
import envs from "./utils/envs";
import { connect } from "mongoose";
import * as AWS from "aws-sdk";
import { verifyPaymentQueue } from "./queues/verifyPayments";
import { getPaymentDataQueue } from "./queues/getPaymentData";
import Helmet from 'helmet'

AWS.config.update({ region: "us-east-1" });

const main = async () => {
  await connect(envs.MONGO_URI);

  verifyPaymentQueue();
  getPaymentDataQueue();

  const app = express();
  app.use(Helmet())
  app.disable('x-powered-by');

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/health", (_, res) => {
    res.status(200).send("OK");
  });
  app.use("/order", orderRoute);
  app.use("/product", productRoute);
  app.use("/customer", customerRoute);

  app.listen(envs.PORT, async () => {
    console.log(`Server listen on port ${envs.PORT}`);
  });
};

main();
