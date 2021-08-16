const  mdpSchema = require('../models/mdp');

//Renforcer et sécuriser les mots de passe entrant
module.exports = (req, res, next) => {
    if(!mdpSchema.validate(req.body.password)) {
        return res.status(400).json({ error: 'Votre mot de passe est faible ' + mdpSchema.validate(req.body.password, { list: true })});
    }
    else { 
        next(); 
    }
}
