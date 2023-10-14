const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const register = (req, res, next) => {
  console.log('req', req.body);
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err,
      });
    }
    let admin = new Admin({
      nom: req.body.nom,
      email: req.body.email,
      password: hashedPass,
    });

    admin
      .save()
      .then((admin) => {
        res.json({
          message: 'admin added successfully',
        });
      })
      .catch((error) => {
        console.log('error register', error);
        res.json({
          message: 'an error occurred',
        });
      });
  });
};

const login = async (req, res, next) => {
  console.log('login body', req.body);
  var email = req.body.email;
  var password = req.body.password;

  Admin.findOne({ email: email }).then((admin) => {
    if (admin) {
      if (password === admin.password) {
        // Set expiration time to 10 minutes from the current time
        const expirationTime = Date.now() + 10 * 60 * 1000;

        let token = jwt.sign(
          { _id: admin._id, email: email, role: admin.role, exp: expirationTime },
          'verySecretValue'
        );
        res.cookie('token', token, {
          expires: new Date(expirationTime),
          httpOnly: true,
        });
        res.json({
          message: 'Login Successful',
          token,
        });
      } else {
        res.json({
          message: 'Password does not match',
        });
      }
    } else {
      res.json({
        message: 'No admin found',
      });
    }
  });
};


const updateProfile = async (req, res) => {
  const email = req.body.email;
  const currentPassword = req.body.password;
  const newPassword = req.body.nouveauPassword;

  try {
    // Vérifiez l'authentification de l'utilisateur/administrateur (vous pouvez ajouter une logique de vérification ici)

    // Recherchez l'administrateur par email
    const admin = await Admin.findOne({ email });

    // Vérifiez si l'administrateur existe
    if (!admin) {
      return res.status(404).json({ message: 'Administrateur introuvable' });
    }

    // Vérifiez si le mot de passe actuel correspond
    if (currentPassword !== admin.password) {
      return res.status(401).json({ message: 'Mot de passe incorrect' });
    }

    // Mettez à jour le mot de passe de l'administrateur
    admin.password = newPassword;
    await admin.save();

    res.json({ message: 'Profil administrateur mis à jour avec succès' });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la mise à jour du profil', error });
  }
};


 

const logout = (req, res, next) => {
  res.clearCookie('token');
  res.json({
    message: 'Logout Successful',
  });
};

module.exports = {
  register,
  login,
  logout,
  updateProfile
};
