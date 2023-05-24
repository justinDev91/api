//Serveur Express HTTP

//Importer les modules
const express = require('express')
//dotenv permet d'utiliser des variables d'environnement
const dotenv = require('dotenv')
//morgan permet d'utiliser des logs pour affichers des informations sur les requêtes au console 
const morgan = require('morgan')
//bodyparser permet d'nalysez les corps de requête entrants dans un middleware
const bodyparser = require("body-parser");
//path pour obtenir dynamiquement le path des fichiers
const path = require('path');
//Importer la fonction de connexion à la DBB MongoDb
const connectDB = require('./server/database/connection')



//Créer un serveur express
const app = express()

//Récuparation de variable globale port
dotenv.config({path:'./config.env'})
const PORT=process.env.PORT || 8080

//Les middlewares

// Les logs des requêtes 
app.use(morgan('tiny'));

//Connexion à MongoDB
connectDB();

//Analyseur de corps de requête
app.use(bodyparser.urlencoded({extented:true}))

//Définier le template engine (moteur de modèle), pour afficher des données visible en html
app.set("view engine", "ejs")

//Charger les ressources externes
app.use('/css', express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js', express.static(path.resolve(__dirname,"assets/js")))

//Charger les routes 
app.use('/', require('./server/routes/router'))


//Attribuer au serveur un port
app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)});

