const { Router } = require('express');
const contratController = require('../controllers/contrat');
var cors =require('cors');
const router = Router();

router.post('/', contratController.add);
router.get('/', contratController.affiche);
router.delete('/', contratController.delete);
router.put('/', contratController.update);
router.get('/pdf', contratController.generate_pdf);

module.exports = router;