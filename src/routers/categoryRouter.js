const express = require('express');
const auth = require('~/app/middlewares/auth.js')
const router = express.Router();

const CategoryController = require('~/app/controllers/CategoryController');

router.post('/', auth, CategoryController.create);
router.put('/:id', auth, CategoryController.update);
router.delete('/:id', auth, CategoryController.delete);
router.get('/', auth, CategoryController.get);
module.exports = router;