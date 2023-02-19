const Product = require('../models/Product');

//Obtener productos
module.exports.get_products = (req,res) => {
    Product.find().sort({date:-1}).then(products => res.json(products));
}

// Agregar un producto
module.exports.post_product = (req,res) => {
    const newProduct = new Product(req.body);
    newProduct.save().then(product => res.json(product));
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