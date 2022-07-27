const mongoose = require("mongoose");
const congeSchema =  mongoose.Schema(
{
   //_id:Object,
   numconge:Number,
   matricule: Number,
   nom: String,
   prenom: String,
   dateDepart : Date, 
   dateRetour: Date,
   nbjour: Number,
  typeconge:String,

  
}



);



const  Conge = mongoose.model('conge', congeSchema);

module.exports = {Conge}