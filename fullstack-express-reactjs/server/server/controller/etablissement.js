//Importer les modules
const uuid = require('uuid')
const fs = require('fs')
const path = require('path');

//Tableau d'objet 
let etablissements = []
 
//Charler le fichier json et récuperer les données dans le fichier json
try {
    const currentContent = fs.readFileSync(`${__dirname}\\MOCK_DATA.json`, 'utf-8')
    const donneesetablissements =  JSON.parse(currentContent)
    etablissements = donneesetablissements
    
} catch (error) {
    console.log(error)
}

//Charler les données 


//Ecrire dans le fichier json
/*
const newObjet = {
    id: 500000,
    etablissement_type : 'wow',
    etablissement : 'justkas',
    location : 'ces fossiles témoins du passé, régnants que parmisl les',
    address : "15 rue jean",
    mail : "jk@gmail.com"
}

*/

/*
fs.writeFile(`${__dirname}\\MOCK_DATA.json`, JSON.stringify(newObjet), err => {
    if(err){
        console.log(err)
        fs.close()
    }
})

*/



//API CRUD
exports.createEtab = (req, res) => {
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Les contenus ne peuvent pas être vides"});
        return;
    }
    //Ajouter un établissement
    const etablissement = req.body

    etablissements.push({id: uuid.v4(), ...etablissement})
    res.send("L'établissement à été ajouter avec succès")
}


exports.getEtablissements = (req, res) => {
    res.send(etablissements)
};


exports.getEtablissement = (req, res) => {
    const etablissement = etablissements.filter((etab) => etab.id === req.params.id)
    res.send(etablissement)
};

exports.upddateEtablissement = (req, res) => {
    const etablissement = etablissements.find((etab) => etab.id === req.params.id)

    etablissement.etablissement_type = req.body.etablissement_type
    etablissement.etablissement = req.body.etablissement
    etablissement.location = req.body.location
    etablissement.address = req.body.address
    etablissement.mail = req.body.mail
    
    res.send("L'établissement à été modifier avec succès")
}


exports.deleteEtablissement = (req, res) => {
    etablissements = etablissements.filter((etab) => etab.id !== req.params.id)
    res.send("Etablissement supprimé")
}

