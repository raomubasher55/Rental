const Subcategory = require('../models/SubCategory');
const Product = require('../models/Product');
const Category = require('../models/Category');

// Create a new subcategory
exports.createSubcategory = async (req, res) => {
  try {
    const { categoryId, name } = req.body;

    // Validate inputs
    if (!categoryId || !name) {
      return res.status(400).json({ message: "Category ID and subcategory name are required." });
    }

    // Check if the category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found." });
    }

    // Create the subcategory
    const subcategory = new Subcategory({ name, category: categoryId });
    await subcategory.save();

    // Update the category with the new subcategory
    category.subcategories.push(subcategory._id);
    await category.save();  // Ensure changes are saved

    res.status(201).json({
      message: "Subcategory created and associated with category successfully.",
      subcategory,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating subcategory.", error: error.message });
  }
};

// Get all subcategories with products
exports.getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate('products');
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get by id
exports.getSubcategory = async (req, res) => {
    try {
      const { subcategoryId } = req.params;
  
      // Fetch subcategory and populate products array
      const subcategory = await Subcategory.findById(subcategoryId).populate('products');
      if (!subcategory) {
        return res.status(404).json({ message: "Subcategory not found." });
      }
  
      res.status(200).json(subcategory);
    } catch (error) {
      res.status(500).json({ message: "Error fetching subcategory.", error: error.message });
    }
  };

// Update a subcategory
exports.updateSubcategory = async (req, res) => {
  try {
    const { name } = req.body;
    const subcategory = await Subcategory.findByIdAndUpdate(req.params.id, { name }, { new: true });
    if (!subcategory) return res.status(404).json({ message: 'Subcategory not found' });
    res.status(200).json({ message: 'Subcategory updated successfully', subcategory });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a subcategory
exports.deleteSubcategory = async (req, res) => {
  try {
    const subcategory = await Subcategory.findByIdAndDelete(req.params.id);
    if (!subcategory) return res.status(404).json({ message: 'Subcategory not found' });
    res.status(200).json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
