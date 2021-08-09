const mongoose = require('mongoose');

// // //Creation schema de donnée. Un modèle de donné qui permet d'enregistrer, lire, modifier les objets qui sont en vente dans la base de donnée
const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true},
    name: {type: String, required: true},
    manufacturer: {type: String, required: true},
    description: {type: String, required: true},
    mainPepper: {type: String, required: true},
    imageUrl: {type: String, required: false},
    heat: {type: Number, required: true},
    likes: {type: Number, required: true, default: 0},
    dislikes: {type: Number, required: true, default: 0},
    usersLiked: {type: Array, required: true, default: []},
    usersDisliked: {type: Array, required: true, default: []}, 
});

module.exports = mongoose.model('Sauce', sauceSchema);