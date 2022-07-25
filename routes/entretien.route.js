const { model } = require("mongoose");
const entretienController = require("../controllers/Entretien")
const router = require("express").Router();
//var cros = require('cros');



/**
 * @Path /entertien
 */
router.route("/")
    .post(entretienController.FixerEntretien)
    .get(entretienController.getAllEntretien);


router.get("/:id",entretienController.getEntretienById);
router.get("/update/:id",entretienController.updateEntretien);
router.get("/delete/:id",entretienController.deleteEntretien);

module.exports = router;
