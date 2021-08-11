const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); //Gérer la demande POST provenant de l'application front-end, permet l'extraction de l'objet JSON de la demande
const path = require('path'); //Donne acccès au chemin du systeme de fichier

const sauceRoutes = require('./routes/sauce'); //Importation du Router
const userRoutes = require('./routes/user');

//Connection de l'API au cluster mongoDB
mongoose.connect('mongodb+srv://FirstUser:824658NG@cluster0.xp0aq.mongodb.net/Sopekocko?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log('Connexion à MongoDB réussi !'))
  .catch(() => console.log('Connexion à MongoDB échoué !'));

  const app = express(); //Création d'une application express

  //Middleware qui permet l'envoie de requête et d'accéder à l'API 
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json());

  app.use('/images', express.static(path.join(__dirname, 'images'))); //Sert le dossier statique images

  app.use('/api/sauces', sauceRoutes);
  app.use('/api/auth', userRoutes);  

  module.exports = app; //Permet l'accès depuis les autres fichiers, notamment le serveur Node 

