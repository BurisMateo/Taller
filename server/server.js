require('dotenv').config();
const express = require('express');
const { appConfig, dbConfig } = require('./config');
const connectDb = require('./db/mongodb');
const cors = require('cors');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');
const favoriteRoutes = require('./routes/favorite');
const { config: auth0config } = require('./auth/auth0.config');
const { auth } = require('express-openid-connect');

const app = express();
app.use(cors())
app.use(express.json());
app.use(auth(auth0config));

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.use('/api',userRoutes)
app.use('/api',productRoutes);
app.use('/public', express.static(`${__dirname}/storage/imgs`));
app.use('/api',cartRoutes);
app.use('/api',orderRoutes);
app.use('/api',favoriteRoutes)

//conecta a mongoDB 
async function initApp (appConfig, dbConfig) {
    try {
        await connectDb(dbConfig)
        app.listen(appConfig.port, () => console.log(`listen on port ${appConfig.port}`))
    } catch (error) {
        console.error(error);
        process.exit(0);
    }
};

initApp(appConfig, dbConfig);
