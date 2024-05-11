import express from 'express';
import orderRoute from './routes/order';
import productRoute from './routes/product';
import envs from './utils/envs';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/order',orderRoute);
app.use('/product',productRoute);

app.listen(envs.PORT, () => {
    console.log(`Server listen on port ${envs.PORT}`);
});