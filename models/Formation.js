const mongoose = require('mongoose');
const Schema= mongoose.Schema;

const formationSchema = new mongoose.Schema({
 
    userId:{
type: Schema.Types.ObjectId,
required: true ,
ref: "user",
    },

  name: {
        type: String,
        required: [true, 'Remplir le nom de la formation'],
      
    },
    description: {
        type: String,
        required: [true, 'Remplir le description de la formation'],
        
    },
    nbheures: {
        type: String,
       
       
    },
    formateur: {
        type: String,
        required: [true, 'Remplir le nom de la formateur'],
        
    },
    prix: {
        type: Number
    },
    date_debut: { type: String},
    date_fin: { type: String},
    created_at: { type: Date, default: Date.now },
    is_confirmed: {
        type: Boolean,
        default: false
    }
});



const Formation = mongoose.model('formation', formationSchema);

module.exports = Formation;