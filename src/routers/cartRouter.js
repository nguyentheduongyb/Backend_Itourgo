const express = require('express');
const auth = require('~/app/middlewares/auth.js')
const router = express.Router();

const CartController = require('~/app/controllers/CartController');

router.post('/', auth, CartController.add);
router.put('/:id', auth, CartController.update);
router.delete('/:id', auth, CartController.delete);
router.get('/', auth, CartController.get);
module.exports = router;