const  Favorite = require( '../models/Favorite' ); 
const  Product = require( '../models/Product' );

module.exports.get_fav_products = async (req,res) => {
    const userId = req.params.id;
    try{
        let fav = await Favorite.findOne({userId});
        if(fav && fav.products.length > 0){
            res.send(fav);
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

module.exports.add_fav_product = async (req,res) => {
    const userId = req.params.userId;
    const productId = req.params.productId;

    try{
        let fav = await Favorite.findOne({userId});
        let product = await Product.findOne({_id: productId});
        if(!product){
            res.status(404).send('Producto no encontrado')
        }
        const name = product.title;
        
        if(fav){
            // Si el carrito del usuario existe
            let productIndex = fav.products.findIndex(p => p.productId == productId);

            // Comprueba si el producto existe o no en favoritos
            if(productIndex > -1)
            {
                //si existe 
                res.status.send("Ya es parte de tus favoritos")
            }
            else {
                //si no agrega el proucto
                fav.products.push({ productId, name });
            }
            fav = await fav.save();
            return res.status(201).send(fav);
        }
        else{
            // Si el usuario no tiene favoritos
            const newFavorite = await Favorite.create({
                userId,
                products: [{ productId, name }],
            });
            return res.status(201).send(newFavorite);
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
        let fav = await Favorite.findOne({userId});
        let productIndex = fav.products.findIndex(p => p.productId == productId);
        if(productIndex > -1)
        {
            //Eliminamos el producto
            fav.products.splice(productIndex,1);
        }
        fav = await fav.save();
        return res.status(201).send(fav);
    }
    catch (err) {
        console.log(err);
        res.status(500).send("Algo salió mal");
    }
}