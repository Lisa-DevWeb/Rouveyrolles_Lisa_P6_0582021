const bcrypt = require('bcrypt'); //Le package bcrpyt permet un cryptage sécurisé avec un algorithme unidirectionnel.
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        const user = new User({
          email: req.body.email,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })  //Recuperation du hash du mdp qu'on va enregistrer dans un new user qu'on va enregistrer dans la base de donnée
      .catch(error => res.status(500).json({ error }));
  }; //Hacher le mdp , fonction asynchrone , avec le h créé par bcrypt on rengistre le user dans la base de donnée. Combien de fois on execute l'algorythme de hashage
  //Fonction signup qui va crypter le mdp, prend le mdp crytpé et créé un nouveau user avec ce mdp crypté et passer l'adresse mail dans le corps de la requete et va enregistrer l'utilisateur dans la base de donnée = logique de signup. bcrypt sait quand deux hash différents ont été produits à partir du même string d'origine
  
  exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
      .then(user => {
        if (!user) {
          return res.status(401).json({ error: 'Utilisateur non trouvé !' });
        }
        bcrypt.compare(req.body.password, user.password)
          .then(valid => {
            if (!valid) {
              return res.status(401).json({ error: 'Mot de passe incorrect !' });
            }
            res.status(200).json({
              userId: user._id,
              token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
              )
            });
          })
          .catch(error => res.status(500).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };