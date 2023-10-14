const express = require('express')
const router = express.Router()

const CommandeController = require('../controllers/commandeController')

router.post('/addCommande', CommandeController.addCommande),
router.get('/getCommandes', CommandeController.getCommandes)
router.get('/getCommandeById/:id', CommandeController.getCommandeById)
router.put('/updateCommande/:id',CommandeController.updateCommande )
router.delete('/deleteCommande/:id',CommandeController.deleteCommande)

module.exports = router