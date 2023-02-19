const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
mongoose.set('strictQuery', false);

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');
const cartRoutes = require('./routes/cart');
const orderRoutes = require('./routes/order');

const app = express();
app.use(express.json());

app.use('/api',authRoutes);
app.use('/api',productRoutes);
app.use('/api',cartRoutes);
app.use('/api',orderRoutes);

//usado en produccion para servir los archivos de 'client'
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}


//conecta a mongoDB y ejecuta en el puerto 4000
const dbURI = config.get('dbURI');
const port = process.env.PORT || 4000;
mongoose.connect(dbURI, { useNewUrlParser: true })
    .then(() => app.listen(port, () => console.log(`Server running on http://localhost:${port}`)))
    .catch((err) => console.log(err));
