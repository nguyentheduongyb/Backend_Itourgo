const express = require('express');
const auth = require('~/app/middlewares/auth.js')
const router = express.Router();
const ProductController = require('~/app/controllers/ProductController');



router.post('/', ProductController.upload, ProductController.create);
router.put('/:id', auth, ProductController.update);
router.delete('/:id', auth, ProductController.delete);
router.get('/:query', auth, ProductController.filter);
router.get('/', ProductController.get);
module.exports = router;