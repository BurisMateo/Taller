const  Cart = require( '../models/Cart' ); 
const  Product = require( '../models/Product' );

module.exports.get_cart_products = async (req,res) => {
    const userId = req.params.id;
    try{
        let cart = await Cart.findOne({userId});
        if(cart && cart.products.length > 0){
            res.send(cart);
        }
        else{
            res.send(null);
        }
    }
    catch(err){
        console.log(err);
        res.status(500).send("Algo salió mal");
    }
}

module.exports.add_cart_product = async (req,res) => {
    const userId = req.params.id;
    const { productId, quantity } = req.body;

    try{
        let cart = await Cart.findOne({userId});
        let product = await Product.findOne({_id: productId});
        if(!product){
            res.status(404).send('Producto no encontrado')
        }
        const price = product.price;
        const name = product.title;
        
        if(cart){
            // Si el carrito del usuario existe
            let productIndex = cart.products.findIndex(p => p.productId == productId);

            // Comprueba si el producto existe o no en el carrito
            if(productIndex > -1)
            {
                //si existe agrega a la cantidad de ese mismo producto
                let productItem = cart.products[productIndex];
                productItem.quantity += quantity;
                cart.products[productIndex] = productItem;
            }
            else {
                //si no agrega el proucto al carrito
                cart.products.push({ productId, name, quantity, price });
            }
            cart.bill += quantity*price;
            cart = await cart.save();
            return res.status(201).send(cart);
        }
        else{
            // Si el usuario no tiene carrito le crea uno
            const newCart = await Cart.create({
                userId,
                products: [{ productId, name, quantity, price }],
                bill: quantity*price
            });
            return res.status(201).send(newCart);
        }       
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Algo salió mal");
    }
}

module.exports.delete_product = async (req,res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;
    try{
        let cart = await Cart.findOne({userId});
        let productIndex = cart.products.findIndex(p => p.productId == productId);
        if(productIndex > -1)
        {
            let productItem = cart.products[productIndex];
            cart.bill -= productItem.quantity*productItem.price;
            //Eliminamos el producto
            cart.products.splice(productIndex,1);
        }
        cart = await cart.save();
        return res.status(201).send(cart);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
}