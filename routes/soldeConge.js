const { model } = require("mongoose");
const congeController = require("../controllers/conge.controller")
const router = require("express").Router();

/**
 * @Path /soldeconge
 */
router.route("/")
.post(congeController.addSoldeConge)
.get(congeController.showAllSoldeConge);


router.get("/:id",congeController.showsoldebyid)
router.get("/update/:id",congeController.updateConge)
router.get("/delete/:id",congeController.deleteConge);

 module.exports = router;