//Routes pour l'inscription et la connexion//

const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authCtrl.js');

//Route pour l'inscription//
router.post('/signup', authCtrl.signup);
//Route pour la connexion//
router.post('/login', authCtrl.login);

module.exports = router;
