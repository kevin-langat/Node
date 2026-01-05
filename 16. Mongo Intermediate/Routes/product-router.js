const express = require('express');
const {
  insertSampleProducts,
  getProductStats,
  analysisOfAProduct,
} = require('../Controllers/product-controller');

const router = express.Router();

router.get('/get-products', insertSampleProducts);
router.get('/get-products-stats', getProductStats);
router.get('/product-analysis/:name', analysisOfAProduct);

module.exports = router;
