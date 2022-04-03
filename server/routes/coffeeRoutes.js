const express = require('express');
const productController = require('../controllers/coffeeController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .get(productController.getAllCoffee)
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    productController.createCoffee
  );

router
  .route('/:name')
  .get(productController.getCoffee)
  .patch(
    authController.protect,
    authController.restrictTo('admin'),
    productController.updateCoffee
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin'),
    productController.deleteCoffee
  );

module.exports = router;
