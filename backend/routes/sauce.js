//Déportation de la logique routing sur le Router
const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//Fonctions importées et appliquées aux routes depuis le dossier Controllers
router.post('/', auth, multer, sauceCtrl.createSauce); //Enregistrer sauce dans la base de donnée / CreateSauce
router.put('/:id', auth, multer, sauceCtrl.modifySauce); //Mettre à jour une sauce existante 
router.delete('/:id', auth, sauceCtrl.deleteSauce); //Supprimer une sauce
router.get('/:id', auth, sauceCtrl.getOneSauce); //Récupération d'une sauce specifique
router.get('/', auth, sauceCtrl.getAllSauces); //Renvoie toutes les sauces
router.post('/:id/like', auth, sauceCtrl.likeSauce);

module.exports = router;