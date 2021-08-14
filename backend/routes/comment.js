//Routes pour les commentaires//

const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/commentsCtrl');
const auth = require('../middleware/auth');

//Route pour afficher tous les commentaires//
router.get('/', commentsCtrl.findAllComments);
//Route pour afficher un commentaire//
router.get('/:Messageid', commentsCtrl.findOneComment);
//Route pour créer un commentaire//
router.post('/', auth, commentsCtrl.createComment);
//Route pour supprimer un commentaire//
router.delete('/', auth, commentsCtrl.deleteComment);

module.exports = router;
