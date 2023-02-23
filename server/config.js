const config = {
    appConfig: {
        host: process.env.APP_HOST,
        port: process.env.APP_PORT
    },
    dbConfig: {
        port: process.env.DB_PORT,
        host: process.env.DB_HOST,
        dbName: process.env.DB_NAME
    },
    jwtsecret: 'MFb2@+D7=H`W &AM&<?2>9 &sP@k8-sRFz9):BPmkuHPgUwEFBOkw+GGmbgDPRmn',
    StripeAPIKey: 'sk_test_51Ma6xoEySfBVAZELJA2bjrnyQcjbdgSqhKmDYz3k7G7aocHtMbLGGmaMw0qXteUByAax5Ke5s5Jc8GpzI3nAtY8b00yKRxDwsC'
};

module.exports = config;