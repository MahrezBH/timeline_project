const mongoose = require("mongoose");
const soldeCongeSchema =  mongoose.Schema(
{
    matricul: {
        type: String,
        required: true,
        unique: true,
        
    },
	soldeannuel	: Number,
	soldecompensation : Number,
	soldemaladie: Number
	

}



);



const  Soldeconge = mongoose.model('soldeconge', soldeCongeSchema);

module.exports = {Soldeconge}