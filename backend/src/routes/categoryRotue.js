const express = require('express');
const { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory, getNestedCategories } = require('../controllers/categoryController');

const router = express.Router();

router.post('/', createCategory);
router.get('/', getCategories);
router.get('/nested', getNestedCategories);
router.get('/:id', getCategoryById);
router.put('/:id', updateCategory);
router.delete('/:id', deleteCategory);

module.exports = router;
