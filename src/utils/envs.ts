export default {
    PORT: process.env.PORT ?? 3000,
    URL_PAYMENT_GATEWAY: process.env.URL_PAYMENT_GATEWAY ?? '',
    URL_PRODUCTION_GATEWAY: process.env.URL_PRODUCTION_GATEWAY ?? '',
    MONGO_URI: process.env.MONGO_URI ?? '',
}