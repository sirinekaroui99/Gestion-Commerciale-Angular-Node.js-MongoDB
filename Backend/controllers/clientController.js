const Client = require('../models/client');

// Ajouter un client
const addClient = async (req, res, next) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(200).json({ message: "Client added successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir la liste des clients
const getClients = async (req, res, next) => {
  try {
    const clients = await Client.find();
    res.status(200).json(clients);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtenir un client par son ID (passage par paramètre)
const getClientById = async (req, res, next) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) throw new Error('Client not found');
    res.status(200).json(client);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getClientByName = async (req, res, next) => {
  try {
    const nom = req.params.nom; // Récupérer le nom à partir des paramètres de la requête
    const client = await Client.findOne({ nom: nom }); // Rechercher le client par son nom
    if (!client) throw new Error('Client not found');
    res.status(200).json(client);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// Mettre à jour un client
const updateClient = async (req, res, next) => {
  try {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body);
    if (!client) throw new Error('Client not found');
    res.status(200).json({ message: 'Client updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Supprimer un client
const deleteClient = async (req, res, next) => {
  try {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) throw new Error('Client not found');
    res.status(200).json({ message: 'Client deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  addClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
  getClientByName
};
