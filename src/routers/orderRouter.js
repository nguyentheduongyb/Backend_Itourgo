const express = require('express');
const auth = require('~/app/middlewares/auth.js')
const router = express.Router();

const OrderController = require('~/app/controllers/OrderController');

router.post('/', auth, OrderController.create);
router.put('/:id', auth, OrderController.update);
// router.delete('/:id', auth, OrderController.delete);
router.get('/:id', auth, OrderController.get);
module.exports = router;