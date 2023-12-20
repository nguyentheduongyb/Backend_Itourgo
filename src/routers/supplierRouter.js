const express = require('express');
const auth = require('~/app/middlewares/auth.js')
const router = express.Router();

const SupplierController = require('~/app/controllers/SupplierController');

router.post('/', SupplierController.create);
router.put('/:id', auth, SupplierController.update);
router.delete('/:id', auth, SupplierController.delete);
router.get('/', SupplierController.get);
module.exports = router;