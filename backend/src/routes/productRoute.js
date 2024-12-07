const express = require('express');
const { createProduct, getProducts, updateProduct, deleteProduct, searchProducts } = require('../controllers/productController');

const router = express.Router();

router.post('/', createProduct);
router.get('/', getProducts);
router.get('/search', searchProducts    );
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
