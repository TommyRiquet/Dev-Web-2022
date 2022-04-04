const mongoose = require('mongoose')


const bookSchema = new mongoose.Schema({
    /*Ce Schéma est utilisé lors de l'envoie ou la récupération de livre dans le DB Mongo */
    type: { type : String},
    name: { type : String},
    link: { type : String},
    description: { type : String},
    price: {type : Number},
    author: { type : String},
    publisher: { type : String}
})

module.exports = mongoose.model('Book', bookSchema);
