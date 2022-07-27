const { model } = require("mongoose");
const congeController = require("../controllers/conge.controller")
const router = require("express").Router();
const XLSX = require("xlsx");
const { exportData } = require("../controllers/conge.controller");

/**
 * @Path /conge
 */
router.route("/")
    .post(congeController.createConge)
    .get(congeController.getAllConge);


router.get("/:id", congeController.getCongeById);
router.put("/update/:id", congeController.updateConge);
router.delete("/:id", congeController.deleteConge);
router.post("/telech", congeController.exportData);
module.exports = router;