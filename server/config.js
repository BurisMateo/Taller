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
    
    StripeAPIKey: 'sk_test_51Ma6xoEySfBVAZELJA2bjrnyQcjbdgSqhKmDYz3k7G7aocHtMbLGGmaMw0qXteUByAax5Ke5s5Jc8GpzI3nAtY8b00yKRxDwsC'
};

module.exports = config;