const mongoose = require('mongoose')

const entretienSchema = mongoose.Schema(
    {
        Title: {
            type: String,
            required: true
          },
        Type: {
            type: String,
            required: true
          },
        Description: {
            type: String
          },
        Start: {
            type: Date,
            default: Date.now,
            required: true
          },
        End: {
            type: Date,
            default: Date.now,
            required: true
          },
        Lieu: {
            type: String,
            required: true
          },
        Participants: {
            type: String,
            required: true
        }
            
});

const Entretien = mongoose.model('entretien', entretienSchema);
module.exports= {Entretien}

