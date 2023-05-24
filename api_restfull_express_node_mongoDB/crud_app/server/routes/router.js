//Importer les modules
const express = require('express')
const route = express.Router()
const services = require('../services/render')
const controller = require('../controller/controller')


//Les requêtes pour la navigation 
/**
 * @description Root Route (page d'acceuil )
 * @method GET/
 */
route.get('/', services.homeRoutes)

/**
 * @description ajouter un utilisateur
 * @method GET/add-user

 */
route.get('/add-user', services.add_user)
/**
 * @description mettre à jour un utilisateur
 * @method GET/update_user
 */
route.get('/update-user',services.update_user)


//API CRUD
route.post('/api/users', controller.create);
route.get('/api/users', controller.find);
route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);


//exporter avant des les utiliser 
module.exports = route