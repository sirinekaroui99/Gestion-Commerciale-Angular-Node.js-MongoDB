const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Définir le schéma pour le client
const clientSchema = new Schema({
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
    }
});

const Client = mongoose.model('Client', clientSchema);

module.exports = Client;
