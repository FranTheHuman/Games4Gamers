const mongoose = require('mongoose')

const schema = mongoose.Schema

const GameSchema = new mongoose.Schema({
    title: String,
    category: String,
    price:  Number,
    cover: String,
    stock: {
        type: Boolean,
        default: true
    },
    FavOfUsers: [{
        type: schema.Types.ObjectId,
        ref: 'Users'
    }]
})

module.exports = mongoose.model('Games', GameSchema)

// db.Games.insert({"category": "FPS", "name": "Counter Strike", "price":"100", "cover": "https://file-cdn.scdkey.com/product/P201609081840430525.jpg"});