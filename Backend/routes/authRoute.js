const express = require('express')
const router = express.Router()

const AuthController = require('../controllers/auth')

router.post('/register', AuthController.register)
router.post('/login', AuthController.login) 
router.post('/logout', AuthController.logout); // Ajout de la route de déconnexion
router.post('/updateProfil', AuthController.updateProfile)

module.exports = router 