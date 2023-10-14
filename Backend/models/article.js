const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Définir le schéma pour l'article
const articleSchema = new Schema({
    reference: {
        type: String,
         
    },
    designation: {
        type: String,
        required: true
    },
    prixAchat: {
        type: Number,
        required: true
    },
    prixVente: {
        type: Number,
        required: true
    },
    fournisseur: {
        type: String,
        required: true
    },
    quantiteEnStock: {
        type: Number,
        required: true
    },
    emplacementDansBoutique: {
        type: String,
        required: true
    },
    emplacementDansdepot: {
        type: String,
        required: true
    },
    quantiteVendu: {
        type: Number,
        required: true
    }
});

const Article = mongoose.model('Article', articleSchema);
module.exports = Article;
