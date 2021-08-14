//Routes pour les utilisateurs//

const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/usersCtrl');
const auth = require('../middleware/auth');

//Route pour trouver tous les utilisateurs//
router.get('/all/', userCtrl.findAllUsers);
//Route pour trouver un utilisateur//
router.get('/:id', userCtrl.findOneUser);
//Route pour mettre a jour un utilisateur//
router.put('/:id', auth, userCtrl.updateOneUser);
//Route pour supprimer un utilisateur par l'admin//
router.delete('/', auth, userCtrl.deleteOneUser);
//Route pour supprimer son compte//
router.delete('/:id', auth, userCtrl.deleteMyAccount);

module.exports = router;
