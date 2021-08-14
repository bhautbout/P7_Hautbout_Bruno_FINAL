# PROJET 7 - Réseau social Groupomania

## Requis

Vous devez installer :
    -   Node.js
    -   Npm,
    -   MySQL,
    -   Git.

Clonez le depot suivant dans un dossier :

https://github.com/bhautbout/P7_Hautbout_Bruno_FINAL.git


## frontend

cd frontend, puis : npm install
après l'installation : npm run serve

Les messages suivant apparait :

App running at:
  - Local:   http://localhost:8080/
  - Network: http://192.168.1.12:8080/

## Mysql (création de la base de données "groupomania")

Se connecter dans un autre terminal se connecter à Mysql et importer le fichier suivant :

initBdd.sql

avec la commande :  mysql source initBdd.sql


## backend

Ouvrez le fichier .env et rentrez les valeurs de votre base de données

DB_USER = (votre user)
DB_PASS = (votre mot de passe)
TOKEN_SECRET = (choisissez une valeur)

Dans le dossier backend, faites :

- npm install puis
- nodemon server

## Navigateur

- Ouvrez le navigateur à l'adresse suivante et inscrivez un nouvel utilisateur:

http://localhost:8080/

## Mysql (droit administrateur pour le premier utilisateur)

Pour assigner des droits au premier utilisateur après avoir créé celui-ci, importer le fichier suivant :

initAdmin.sql avec la commande : source initAdmin.sql