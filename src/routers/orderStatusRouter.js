const express = require('express');
const auth = require('~/app/middlewares/auth.js')
const router = express.Router();

const OrderStatusController = require('~/app/controllers/OrderStatusController');

router.post('/', auth, OrderStatusController.create);
router.get('/', auth, OrderStatusController.get);
module.exports = router;