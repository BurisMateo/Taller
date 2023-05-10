const Product = require('../models/Product');

//Obtener productos
module.exports.get_products = (req,res) => {
    Product.find().sort({date:-1}).then(products => res.json(products));
}

// Agregar un producto
module.exports.post_product = async(req,res) => {
    try {
        const {
            title,
            description,
            price,
        } = req.body;

        const ratesByUser = [];

        const product = Product ({
            title,
            description,
            price,
            ratesByUser
        })
        
        if (req.file) {
            const { filename } = req.file;
            product.setImgUrl(filename)
        }
        
        const productStore = await product.save();
        res.status(201).send({ productStore });

    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

// Actualizar un producto
module.exports.update_product = (req,res) => {
    Product.findByIdAndUpdate({_id: req.params.id},req.body).then(function(product){
        Product.findOne({_id: req.params.id}).then(function(product){
            res.json(product);
        });
    });
}

//Eliminar un producto
module.exports.delete_product = (req,res) => {
    Product.findByIdAndDelete({_id: req.params.id}).then(function(product){
        res.json({success: true});
    });
}   

//getOnlyOneProduct

module.exports.get_Product = (req,res) => {
    Product.find({_id: req.params.id},req.body).then(function(product){
        Product.findOne({_id: req.params.id}).then(function(product){
            res.json(product);
        });
    });
}

//valorar el producto
module.exports.setValoration = async (req,res) => {
    const { userId, value } = req.body;

    try {
        let product = await Product.findOne({_id: req.params.id});
        let valIndex = product.ratesByUser.findIndex(v => v.userId == userId);
        
        //si el usuario ya valoró el producto
        if (valIndex > -1) {

            //si la nueva valoración es distinta se guarda
            if (value !== product.ratesByUser[valIndex].value){
                product.ratesByUser[valIndex].value = value;

            } else {
                res.status(201).send(product);
            }
        } else {
            product.ratesByUser.push({ userId, value });
        }
        function ArrayAvg(myArray) {
            var i = 0, summ = 0, ArrayLen = myArray.length;
            while (i < ArrayLen) {
                summ = summ + myArray[i++];
        }
            return summ / ArrayLen;
        }

        var i = 0, summ = 0
        while (i < product.ratesByUser.length) {
            summ = summ + product.ratesByUser[i++].value;
        }
        promRates = summ / product.ratesByUser.length;
        product.rate = promRates.toFixed(2);

        product = await product.save();
        return res.status(201).send(product);
        
    } catch (error) {
        console.log(error);
        res.status(500).send("Algo salió mal");
    }
}


module.exports.get_Valoration = async (req,res) => {
    
    try {
        let product = await Product.findOne({_id: req.params.productId});
        let valIndex = product.ratesByUser.findIndex(v => v.userId == req.params.userId);
        if (valIndex > -1) {
            const value = product.ratesByUser[valIndex].value;
            res.status(201).send(Number(value).toString());
        } else {
            const value = 0;
            res.status(201).send((value).toString());
        }

    } catch (error) {
        console.log(error);
        res.status(500).send("Algo salió mal");
    }
}