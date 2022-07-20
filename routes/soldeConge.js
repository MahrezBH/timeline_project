const { model } = require("mongoose");
const congeController = require("../controllers/conge.controller")
const router = require("express").Router();
var cors = require('cors');

/**
 * @Path /soldeconge
 */
router.route("/")
.post(congeController.addSoldeConge)
.get(congeController.showAllSoldeConge);


router.get("/:id",congeController.showsoldebyid)
router.put("/",congeController.updateSoldeConge)
router.delete("/",congeController.deleteSoldeConge);

 module.exports = router;