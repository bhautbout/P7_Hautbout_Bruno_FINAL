//Routes pour les messages//

const express = require('express');
const router = express.Router();
// const isOwner = require('../middleware/isOwner');
const auth = require('../middleware/auth');
const messageCtrl = require('../controllers/messagesCtrl');
const multer = require('../middleware/multer-config');

//Route pour la création d'un message//
router.post('/', auth, multer, messageCtrl.createMessage);

// router.get('/all/:id', messageCtrl.findAllMessagesForOne);
//Route pour trouver un message//
router.get('/:id', messageCtrl.findOneMessage);
//Route pour trouver tous les messages//
router.get('/', auth, messageCtrl.findAllMessages);
//Route pour supprimer un message//
router.delete('/:id', messageCtrl.deleteMessage);

module.exports = router;
