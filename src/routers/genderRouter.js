const express = require('express');
const auth = require('~/app/middlewares/auth.js')
const router = express.Router();

const GenderController = require('~/app/controllers/GenderController');

router.post('/', auth, GenderController.create);
router.put('/:id', auth, GenderController.update);
router.delete('/:id', auth, GenderController.delete);
router.get('/', auth, GenderController.get);
module.exports = router;