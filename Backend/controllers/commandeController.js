const Commande = require('../models/commande');



// Ajouter un événement
const addCommande = async (req, res, next) => {
    console.log('data', req.body)
  try {
    const commande = new Commande(req.body);
    await commande.save();
    res.status(200).json({ message: 'commande added successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir la liste des événements
const getCommandes = async (req, res, next) => {
  console.log('test get commandes');
   
  const commandes = await Commande.find();
  commandes.forEach(obj => {
    console.log('objeeeeet', obj);
    const date = obj.date;
    console.log("date", date);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const isoDate = new Date(`${year}-${month}-${day}`).toISOString();
    console.log('isoDate', isoDate);
    obj.date = isoDate;
  });
    
  res.status(200).json(commandes);
};


// Obtenir un événement par son ID
const getCommandeById = async (req, res, next) => {
  try {
    const commande = await Commande.findById(req.params.id);
    if (!commande) throw new Error('commande not found');
    res.status(200).json(commande);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};




// Mettre à jour un événement
const updateCommande = async (req, res, next) => {
  try {
    const commande = await Commande.findByIdAndUpdate(req.params.id, req.body);
    if (!commande) throw new Error('commande not found');
    res.status(200).json({ message: 'commande updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un événement
const deleteCommande = async (req, res, next) => {
  try {
    const commande = await Commande.findByIdAndDelete(req.params.id);
    if (!commande) throw new Error('commande not found');
    res.status(200).json({ message: 'commande deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addCommande,
  getCommandes,
  getCommandeById,
  updateCommande,
  deleteCommande,
};
