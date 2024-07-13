export default {
    PORT: process.env.PORT ?? 3000,
    URL_PAYMENT_GATEWAY: process.env.URL_PAYMENT_GATEWAY ?? '',
    URL_PRODUCTION_GATEWAY: process.env.URL_PRODUCTION_GATEWAY ?? '',
    MONGO_URI: process.env.MONGO_URI ?? '',
    QUEUE_RESULT_PAYMENT: process.env.QUEUE_RESULT_PAYMENT ?? '',
    QUEUE_CREATE_PAYMENT: process.env.QUEUE_CREATE_PAYMENT ?? '',
    QUEUE_PRODUCTION: process.env.QUEUE_PRODUCTION ?? '',
}