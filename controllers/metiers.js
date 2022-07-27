var express = require('express');
var router = express.Router();
var Task = require('../models/tasks');
var Metier = require('../models/metier');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
const MetierRouter = router
module.exports = MetierRouter;
