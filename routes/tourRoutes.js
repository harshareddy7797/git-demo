const express = require('express');
const tourConroller = require('./../controllers/tourController');

const router = express.Router();

router.param('id', tourConroller.checkId);

router
    .route('/')
    .get(tourConroller.getTours)
    .post(tourConroller.checkBody, tourConroller.createTours);

router
    .route('/:id')
    .get(tourConroller.getTour)
    .patch(tourConroller.updateTour)
    .delete(tourConroller.deleteTour);

module.exports = router;