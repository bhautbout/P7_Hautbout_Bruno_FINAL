//Coeur de l'APÌ groupomania//

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
const auth = require('./middleware/auth');
const app = express();

const dataBase = require('./models');//pointe vers le fichier index regroupant les paramètres de la base de données//

//Chemin vers les routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const commentRoutes = require('./routes/comment');

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

dataBase.sequelize.sync(); //Synchronisation de la base de données//

app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', authRoutes);

app.use('/api/users', auth, userRoutes);
app.use('/api/messages', auth, messageRoutes);
app.use('/api/comments', auth, commentRoutes);

module.exports = app;
