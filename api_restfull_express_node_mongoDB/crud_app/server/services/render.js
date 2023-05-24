//Le module permet de séparer les routes de navigation en fonction de leur fonctionnalité 

//Importer le module axios pour faire des requêtes à l'API Interne 
const axios = require('axios')


//Afficher l'accuel 
exports.homeRoutes = (req, res) => {
    //Faire une requête get à /api/users pour récupérer les infomations des utilisateurs
     axios.get('http://localhost:3000/api/users')
     .then(function(response){
         res.render('index', { users : response.data });//Transmetre les donnnées de l'API pour les afficher dans le front end 
     })
     .catch(err =>{
         res.send(err);
     })
}

//Afficher le formulaire pour ajouter un utilisateur
exports.add_user = (req, res) => {
    res.render('add_user')
}

//Afficher un formulaire pour mettre à jour un utilisateur
exports.update_user = (req, res) =>{
    //Faire une requête de mise à jour à l'API en utilisant l'id de l'utilisateur
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            res.render("update_user", { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}

