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
            tags
        } = req.body

        
        const product = Product ({
            title,
            description,
            price,
            tags
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

module.exports.getProduct = (req,res) => {
    Product.find({_id: req.params.id},req.body).then(function(product){
        Product.findOne({_id: req.params.id}).then(function(product){
            res.json(product);
        });
    });
}