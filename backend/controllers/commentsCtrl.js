const { sequelize } = require('../models');
const db = require('../models');
const Comment = db.comments;
const User = db.users;


//Créer un commentaire//

exports.createComment = (req, res, next) => {
	

	const comment = new Comment({
		UserId: req.body.UserId,
		MessageId: req.body.MessageId,
		comment: req.body.comment
	});
	comment
		.save()
		.then(() => res.status(201).json({ message: 'Commentaire ajouté !' }))
		.catch(error => res.status(400).json({ error }));
	//}
};

//Trouver un commentaire//

exports.findOneComment = (req, res, next) => {
	Comment.findAll({
		where: {
			MessageId: req.params.Messageid
		},
		include: {
			model: User,
			required: true,
			attributes: ['userName']
		}
	})
		.then(comment => {
			res.status(200).json(comment);
		})
		.catch(error => res.status(404).json({ error }));
};

//Trouver tous les commentaires//

exports.findAllComments = (req, res, next) => {
	Comment.findAll()
		.then(comments => {
			res.status(200).json(comments);
		})
		.catch(error => res.status(400).json({ error }));
};

//Mise a jour d'un commentaire//

exports.modifyOneComment = (req, res, next) => {
	let commentObject = {};
	const body = sanitize(req.body);
	req.file
		? (Comment.update({ _id: req.params.id })
				.then(Comment => {
					const filename = comment.imageUrl.split('/images/')[1];
					fs.unlinkSync(`images/${filename}`);
				})
				.catch(error => res.status(500).json({ error })),
		  (commentObject = {
				...JSON.parse(body.comment),
				imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
		  }))
		: (commentObject = { ...body });

	Comment.update({ ...req.body }, { where: { id: req.params.id } })
		.then(() => {
			res.status(200).json({ message: 'Le commentaire est mis a jour !' });
		})
		.catch(error => res.status(400).json({ error }));
};
//Suppression d'un commentaire//

exports.deleteComment = (req, res, next) => {

	Comment.destroy({ where: { id: req.query.commentId } })
		.then(() => res.status(200).json({ message: 'Le commentaire supprimé !' }))
		.catch(error => res.status(400).json({ error }));
};
