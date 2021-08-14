const db = require('../models');
const Message = db.messages;
const User = db.users;
const Comment = db.comments;

//Créer un message//

exports.createMessage = (req, res, next) => {
	
	let imagePost = '';
	if (req.file) {
		imagePost = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;
	}
	const message = new Message({
		UserId: req.body.UserId,
		message: req.body.message,
		messageUrl: imagePost
	});

	message
		.save()
		.then(() => res.status(201).json({ message: 'Publication réussie' }))
		.catch(error => res.status(400).json({ error }));
};

//Afficher tous les messages//

exports.findAllMessages = (req, res, next) => {
	Message.findAll({
		include: { model: User, required: true, attributes: ['userName'] },

		order: [['id', 'DESC']]
	})
		.then(messages => {
			const list = messages.map(message => {
				return Object.assign(
					{},
					{
						id: message.id,
						createdAt: message.createdAt,
						message: message.message,
						messageUrl: message.messageUrl,
						UserId: message.UserId,
						userName: message.User.userName,
						isActive: message.User.isActive
					}
				);
			});
			res.status(200).json({ list });
		})
		.catch(error => res.status(400).json({ error }));
};

//Trouver un message//

exports.findOneMessage = (req, res, next) => {
	const oneMessage = {};
	Message.findOne({
		where: { id: req.params.id },
		include: {
			model: User,
			required: true,
			attributes: ['userName']
		},
		order: [['id', 'DESC']]
	})
		.then(message => {
			oneMessage.id = message.id;
			oneMessage.userId = message.UserId;
			oneMessage.userName = message.User.userName;
			oneMessage.createdAt = message.createdAt;
			oneMessage.message = message.message;
			oneMessage.messageUrl = message.messageUrl;
			res.status(200).json(oneMessage);
		})
		.catch(error => res.status(404).json({ error }));
};

//Modifier un message//

exports.modifyOneMessages = (req, res, next) => {
	let messageObject = {};
	const body = sanitize(req.body);
	req.file
		? (Message.findOne({ _id: req.params.id })
				.then(message => {
					const filename = message.imageUrl.split('/images/')[1];
					fs.unlinkSync(`images/${filename}`);
				})
				.catch(error => res.status(500).json({ error })),
		  (messageObject = {
				...JSON.parse(body.sauce),
				imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
		  }))
		: (messageObject = { ...body });

	Message.updateOne({ _id: req.params.id }, { ...messageObject, _id: req.params.id })
		.then(() => {
			res.status(200).json({ message: 'Modification effectuée !' });
		})
		.catch(error => res.status(400).json({ error }));
};

//Supprimer un message//

exports.deleteMessage = (req, res, next) => {

	Comment.destroy({ where: { MessageId: req.params.id } });
	Message.destroy({ where: { id: req.params.id } })
		.then(res => {
			return res.status(200).json({ message: 'Le message et les commentaires ont été supprimés' });
		})
		.catch(error => res.status(400).json({ error }));
};
