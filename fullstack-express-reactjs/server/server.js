//Serveur Express HTTP

//Importer les modules
const express = require('express')
//bodyparser permet d'nalysez les corps de requête entrants dans un middleware
const bodyparser = require('body-parser')
//Cors fournir un middleware Connect / Express qui peut être utilisé pour resoudre les problèmes de CORS Policy () avec diverses options.
const cors = require('cors')
//path pour obtenir dynamiquement le path des fichiers
const path = require('path')
const morgan = require('morgan')


const PORT = 5000

//Créer un serveur express
const app = express()

//Les middlewares

// Les logs des requêtes 
app.use(morgan('tiny'));

//Analyseur de corps de requête
app.use(bodyparser.urlencoded({extented:true}))

//Charger le fichier css ressources externes
app.use('/css', express.static(path.resolve(__dirname,"assets/css")))

//Charger le cors avant de charger les routes
app.use(cors())

//Charger les routes 
app.use('/', require('./server/routes/etablissement'))

//Route de nagivation

//Accueil
app.get('/', (req, res) => res.send("Bienvenu sur le serveur Yourban"))

//Inexistant
//app.all('', (req, res) => res.send("La route existant"))

//Attribuer au serveur un port
app.listen(PORT, () => {console.log(`Le serveur à démarré sur le port ${PORT}`)})
