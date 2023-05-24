//Importer les modules
const express = require('express')
const route = express.Router()
//permet d'obtenir un id unique pour chaque requête ou utilsateur
const uuid = require('uuid')
const etablissement = require('../controller/etablissement')


//Les routes
route.post("/etablissement", etablissement.createEtab)
route.get("/etablissements", etablissement.getEtablissements)
route.get("/etablissement/:id", etablissement.getEtablissement)
route.put("/etablissement/:id", etablissement.upddateEtablissement)
route.delete("/etablissement/:id", etablissement.deleteEtablissement)




module.exports = route