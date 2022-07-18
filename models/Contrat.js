const mongoose = require('mongoose')

const contratSchema = new mongoose.Schema({
    
    numContrat: {
        type: Number,
        required: [true, 'entrer le numéro du contrat'],
        minlength: [6, 'Minimum numero contrat length is 6 numbers'],
    },
    
    typeContrat: {
        type: String,
        required: [true, 'entrer le type du contrat'],
        enum: ['CDD', 'CDI', 'CIVP'],

    },
    
    modePaie: {
        type: String,
        required: [true, 'entrer le mode de paie'],
    
    },

    dateSignature: { type: Date, default: Date.now },
    is_confirmed: {
        type: Boolean,
        default: false
    }
});



const Contrat = mongoose.model('contrat', contratSchema);

module.exports = Contrat;