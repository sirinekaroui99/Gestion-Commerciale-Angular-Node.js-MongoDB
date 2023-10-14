const express = require('express')
const router = express.Router()

const ArticleController = require('../controllers/articleController')


router.post('/addArticle', ArticleController.addArticle)
router.get('/getArticles', ArticleController.getArticles)
router.get('/getArticleById/:id', ArticleController.getArticleById)
router.put('/updateArticle/:id', ArticleController.updateArticle)
router.delete('/deleteArticle/:id', ArticleController.deleteArticle)
// Définissez les routes
router.get('/getArticleByDesignation/:designation', ArticleController.getArticleByDesignation);
router.get('/getArticleByRef/:ref', ArticleController.getArticleByRef);
// Route pour mettre à jour la quantité d'un article
router.put('/updateQuantite', ArticleController.updateQuantite);



module.exports = router 