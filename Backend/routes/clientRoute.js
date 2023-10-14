const express = require('express');
const router = express.Router();

const ClientController = require('../controllers/clientController');

router.post('/addClient', ClientController.addClient);
router.get('/getClients', ClientController.getClients);
router.get('/getClientById/:id', ClientController.getClientById);
router.get('/getClientByName/:nom', ClientController.getClientByName);
router.put('/updateClient/:id', ClientController.updateClient);
router.delete('/deleteClient/:id', ClientController.deleteClient);

module.exports = router;
