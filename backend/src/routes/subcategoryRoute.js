const express = require('express');
const { createSubcategory, getSubcategories, updateSubcategory, deleteSubcategory, getSubcategory } = require('../controllers/subcategoryController');

const router = express.Router();

router.post('/', createSubcategory);
router.get('/', getSubcategories);
router.get('/:subcategoryId', getSubcategory);
router.put('/:id', updateSubcategory);
router.delete('/:id', deleteSubcategory);

module.exports = router;
