var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Tasks = new Schema({
     
    title: String,
    description:String,
    zone: String,
   
});
module.exports = mongoose.model('tasks', Tasks);
  