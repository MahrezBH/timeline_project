var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Metier = new Schema({
    title: String,
    _taskId: {
        type: mongoose.Types.ObjectId ,
        required: true,
        
    }
});

  module.exports =  mongoose.model('metier', Metier);
  

 