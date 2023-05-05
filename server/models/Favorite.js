const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const FavoriteSchema = new Schema({
    userId: {
        type: String,
    },
    products: [{
        productId: {
            type: String,
        },
        name: String,
        imgUrl: {
            type: String
        }
    }],
});

module.exports = Favorite = mongoose.model('favorite', FavoriteSchema);
