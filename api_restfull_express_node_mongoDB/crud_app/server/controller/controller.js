//Le controller 
var Userdb = require('../model/model');

//CRUD

// Créer et sauvergarder un utilisateur à la BDD MongoDB
exports.create = (req,res)=>{
     // validate request
     if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
    // Créer un nouvel utilisateur
    const user = new Userdb({
        name : req.body.name,
        email : req.body.email,
        gender: req.body.gender,
        status : req.body.status
    })

    //Sauvegarder le nouvell utilisateur
    user
        .save(user)
        .then(data => {
            //res.send(data) 
            //Redirectionner l'utilisateur  
            res.redirect('/add-user');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}


// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{
    //Récupérer et afficher un utilisateur à partir de son id
    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else{
        //Récupéer et afficher tous les utilisateurs de la BDD users de MongoDB sans id
        Userdb.find()
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
            })
    }
}

// Update a new idetified user by user id
exports.update = (req, res)=>{
    //Vérifier si les paramètres de body ne sont pas vides
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }
    //récupèrer l'id de utilisateur
    const id = req.params.id;
    //Mettre à jour l'utilisateur sur MongoDB
    Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;
    //Supprimer l'utilisateur de la BDD à partir de son id
    Userdb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });

}