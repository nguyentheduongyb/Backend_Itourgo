const express = require('express');
const auth = require('~/app/middlewares/auth.js')
const router = express.Router();
const TourController = require('~/app/controllers/TourController');


router.post('/', TourController.create);
router.get('/:slug', TourController.filter);

router.get('/book/:id', TourController.detail);

router.put('/:id', auth, TourController.update);
router.get('/', TourController.get);
module.exports = router;