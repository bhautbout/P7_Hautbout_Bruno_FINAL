//Model des messages de la base de données//

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Message extends Model {}

	Message.init(
		{
			message: {
				type: DataTypes.TEXT
			},
			messageUrl: {
				type: DataTypes.STRING
			}
		},
		{
			sequelize,
			modelName: 'Message'
		}
	);
	return Message;
};
