const { model } = require("mongoose");
const congeController = require("../controllers/conge.controller")
const router = require("express").Router();

/**
 * @Path /conge
 */
router.route("/")
.post(congeController.createConge)
.get(congeController.getAllConge);


router.get("/:id",congeController.getCongeById)
router.get("/update/:id",congeController.updateConge)
router.get("/delete/:id",congeController.deleteConge);

 module.exports = router;