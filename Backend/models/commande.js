const mongoose = require('mongoose');
const Client = require('./client');
const Schema = mongoose.Schema;

// Définir le schéma pour la commande
const commandeSchema = new Schema({
    num: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    client: {
        nom: {
            type: String,
            required: true
        },
        adresse: {
            type: String,
            required: true
        },
        telephone: {
            type: String,
            required: true
        },
        mf: {
            type: String,
            
        },
         
    },
    articles: [{
        reference: {
            type: String,
             
        },
        designation: {
            type: String,
            required: true
        },
        quantite: {
            type: Number,
            required: true
        },
        prixVente: {
            type: Number,
            required: true
        },
        total: {
            type: Number,
            required: true
        }
    }],
    TotalMontant: {
        type: Number,
        required: true
    },
    TVA: {
        type: Number,
        required: true
    },
    timbreFiscal: {
        type: Number,
        required: true
    },
    totalNetTTC: {
        type: Number,
        required: true
    },
    somme:{
        type : String,
    },
    chauffeur : {
        type : String,
        
    },
    matriculeCamion : {
        type : String
    },
    date: {
        type: Date,
         
    },
});

const Commande = mongoose.model('Commande', commandeSchema);
module.exports = Commande;
