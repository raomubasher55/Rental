const Category = require('../models/Category');
const Subcategory = require('../models/SubCategory');

// Create a new category
exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = new Category({ name });
    await category.save();
    res.status(201).json({ message: 'Category created successfully', category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all categories with subcategories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find()
    .populate('subcategories')

    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories.", error: error.message });
  }
};


// Get a single category
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    .populate('subcategories')
    .populate('products');
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a category
exports.updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await Category.findByIdAndUpdate(req.params.id, { name }, { new: true });
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json({ message: 'Category updated successfully', category });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a category
exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// nested Categories
exports.getNestedCategories = async (req, res) => {
    try {
      const categories = await Category.find()
        .populate({
          path: 'subcategories',
          populate: {
            path: 'products',
            model: 'Product'
          }
        });
  
      const formattedData = categories.map(category => ({
        id: category._id,
        name: category.name,
        subcategories: category.subcategories.map(sub => ({
          id: sub._id,
          name: sub.name,
          products: sub.products.map(prod => ({
            id: prod._id,
            name: prod.name,
            description: prod.description,
            price: prod.price
          }))
        }))
      }));
  
      res.status(200).json(formattedData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };