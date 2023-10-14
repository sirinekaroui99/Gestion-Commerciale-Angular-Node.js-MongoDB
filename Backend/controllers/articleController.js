const Article = require('../models/article');



// Ajouter un article
const addArticle = async (req, res, next) => {
    console.log('data', req.body)
  try {
    const article = new Article(req.body);
    await article.save();
    res.status(200).json({ message: "Article added successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir la liste des articles
const getArticles = async (req, res, next) => {
  console.log('test get articles')
    try {
        const articles = await Article.find();
        res.status(200).json(articles);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
   
};

// Obtenir un article par son ID (passage par parametre)
const getArticleById = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) throw new Error('Article not found');
    res.status(200).json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Mettre à jour un article
const updateArticle = async (req, res, next) => {
  try {
    const article = await Article.findByIdAndUpdate(req.params.id, req.body);
    if (!article) throw new Error('Article not found');
    res.status(200).json({ message: 'Article updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un article
const deleteArticle = async (req, res, next) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) throw new Error('Article not found');
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir un article par désignation
const getArticleByDesignation = async (req, res, next) => {
  const designation = req.params.designation;

  try {
    const article = await Article.findOne({ designation: designation });
    
    if (!article) {
      res.status(404).json({ message: 'Article not found' });
    } else {
      res.status(200).json(article);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir un article par référence
const getArticleByRef = async (req, res, next) => {
  const ref = req.params.ref;

  try {
    const article = await Article.findOne({ reference: ref });
    
    if (!article) {
      res.status(404).json({ message: 'Article not found' });
    } else {
      res.status(200).json(article);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateQuantite = async (req, res, next) => {
  const { designation, quantite } = req.body;

  try {
    // Recherche de l'article par désignation
    const article = await Article.findOne({ designation: designation });

    if (!article) {
      res.status(404).json({ message: 'Article not found' });
    } else {
      // Mettre à jour la quantité en stock et la quantité vendue de l'article
      article.quantiteEnStock -= quantite;
      article.quantiteVendu += quantite;

      // Enregistrer les modifications dans la base de données
      await article.save();

      res.status(200).json({ message: 'Quantité mise à jour avec succès' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};




module.exports = {
  addArticle,
  getArticles,
  getArticleById,
  updateArticle,
  deleteArticle,
  getArticleByDesignation,
  getArticleByRef,
  updateQuantite
};
