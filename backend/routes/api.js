const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

router.post('/:username/:secretname', apiController.createPassword);
router.get('/:username/', apiController.getAllPasswords);

router.patch('/:username/:secretname', apiController.updatePassword);
router.delete('/:username/:secretname', apiController.deletePassword);
router.get('/:username/:secretname', apiController.getPassword);

module.exports = router;