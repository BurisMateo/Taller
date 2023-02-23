require('dotenv').config();
const express = require('express');
const { appConfig, dbConfig } = require('./config');
const connectDb = require('./db/mongodb');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

const app = express();
app.use(cors())
app.use(express.json());

app.use('/api',authRoutes);
app.use('/api',productRoutes);
app.use('/public', express.static(`${__dirname}/storage/imgs`));
app.use('/api',cartRoutes);
app.use('/api',orderRoutes);


//usado en produccion para servir los archivos de 'client'
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}


//conecta a mongoDB 
async function initApp (appConfig, dbConfig) {
    try {
        await connectDb(dbConfig)
        app.listen(appConfig.port, () => console.log(`listen on port ${appConfig.port}`))
    } catch (error) {
        console.error(e);
        process.exit(0);
    }
};

initApp(appConfig, dbConfig);
