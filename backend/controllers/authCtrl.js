const db = require('../models');
const User = db.users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//Inscription d'un utilisateur//

exports.signup = (req, res, next) => {
	if (!req.body.userName || !req.body.email || !req.body.password) {
		return res.status(400).json({ message: 'Un ou plusieurs champs sont vides' });
	}
	const nameRegex = /(.*[A-Za-z]){3,30}/;
	const mailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	const pwdRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

	if (nameRegex.test(req.body.userName) && mailRegex.test(req.body.email) && pwdRegex.test(req.body.password)) {
		bcrypt
			.hash(req.body.password, 10) //Le mot de passe est hasché//
			.then(hash => {
				const user = new User({
					userName: req.body.userName,
					email: req.body.email, 
					password: hash 
				});
				//L'ensemble est sauvegardé dans la base de données//
				user.save() 
					.then(user => {
						if (user) {
							return res.status(201).json({ message: 'Nouveau utilisateur créé' });
						}
					})
					.catch(error => {
						res.status(401).json({ error });
					});
			})
			.catch(error => {
				res.status(500).json({ message: ' Erreur du serveur ' + error });
			});
	} else {
		res.status(400).json({ message: ' Paramètres incorrect ' });
	}
};

//Module connexion de l'utilisateur

exports.login = (req, res, next) => {
	if (!req.body.email || !req.body.password) {
		return res.status(400).json({ message: 'Un ou plusieurs champs sont vides' });
	}
	User.findOne({
		where: {
			email: req.body.email
		}
	})
		.then(user => {
			if (!user) {
				return res.status(404).json({ message: 'L email n a pas été trouvé' });
			}
			bcrypt
				.compare(req.body.password, user.password)
				.then(valid => {
					if (!valid) {
						return res.status(401).json({ message: 'Mot de passe non valide' });
					}
					res.status(200).json({
						message: 'Connexion réussie',
						userId: user.id,
						role: user.isAdmin,
						userName: user.userName,
						token: jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET, { expiresIn: '24h' })
					});
				})
				.catch(error => res.status(500).json({ error }));
		})
		.catch(error => res.status(500).json({ error }));
};
