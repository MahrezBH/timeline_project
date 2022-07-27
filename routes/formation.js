
const { Router } = require('express');
const formationController = require('../controllers/formation.controller');
const router = Router();

router.post('/ajout', formationController.createFormation);
router.get('/affiche', formationController.getAllformation);
router.delete('/delete', formationController.deleteFormation);
router.put('/update', formationController.updateFormation);
router.post('/send_email', formationController.sendEmail);
module.exports = router;