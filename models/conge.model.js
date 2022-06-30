const mongoose = require("mongoose");
const congeSchema =  mongoose.Schema(
{
    numconge :{type: Number, 
        require:true, 
        unique: true
    },
    matricul : String,
    nom : String,
    prenom : String,
    dateDepart : Date,
    dateRetour : Date,
    solde: {type:mongoose.Types.ObjectId,
    ref:'solde'
    },
    typeconge:  {
        type: String,
        enum: ['annuel', 'compensation', 'demaladie'],
        default: 'annuel'
    },
    etat: String
}



);



const  Conge = mongoose.model('conge', congeSchema);

module.exports = {Conge}