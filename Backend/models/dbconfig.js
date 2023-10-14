const mongoose = require('mongoose'); 

// Connecter à la base de données MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/GestionStock', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));