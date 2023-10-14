// Importer les modules nécessaires
const express = require('express'); 
const cors = require('cors'); 
const bodyParser = require('body-parser');
require('./models/dbconfig')
const AuthRoute = require('./routes/authRoute')
const articleRoute = require('./routes/articleRoute')
const commandeRoute = require('./routes/commandeRoute')
const clientRoute = require('./routes/clientRoute')
const path = require('path');


// Créer une instance de l'application Express.js
const app = express();

 app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/auth', AuthRoute)
app.use('/article', articleRoute)
app.use('/commandes', commandeRoute)
app.use('/client',clientRoute)

// Capturez toutes les autres routes et renvoyez l'index.html de votre application Angular
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'index.html'));
});
 
app.listen(3000 , () =>{
    console.log('app listen on port 3000')
  })
  

