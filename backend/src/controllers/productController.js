const Category = require('../models/Category');
const Product = require('../models/Product');
const SubCategory = require('../models/SubCategory');

// Create a new product
exports.createProduct = async (req, res) => {
    try {
      const { name, description, price, subcategoryId , categoryId } = req.body;
  
      // Validate inputs
      if (!name || !description || !price || !subcategoryId) {
        return res.status(400).json({ message: "All fields are required." });
      }
  
      // Check if the Category exists
      const category = await Category.findById(categoryId);
      if (!categoryId) {
        return res.status(404).json({ message: "Category not found." });
      }
      // Check if the subcategory exists
      const subcategory = await SubCategory.findById(subcategoryId);
      if (!subcategory) {
        return res.status(404).json({ message: "Subcategory not found." });
      }
  
      // Create the product
      const product = new Product({ name, description, price, subcategoryId , categoryId });
      await product.save();
  
      // Add product to category's products array
      category.products.push(product._id);
      await category.save(); 

      // Add product to subcategory's products array
      subcategory.products.push(product._id);
      await subcategory.save(); 
  
      res.status(201).json({
        message: "Product created successfully",
        product,
      });
    } catch (error) {
      res.status(500).json({ message: "Error creating product.", error: error.message });
    }
  };

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('subcategoryId');
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, { name, description, price }, { new: true });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.searchProducts = async (req, res) => {
    try {
      const {
        categoryId,
        subcategoryId,
        name,
        description,
        minPrice,
        maxPrice,
        page = 1,
        limit = 10
      } = req.query;
  
      // Building query object
      let query = {};
  
      if (categoryId) {
        query.categoryId = categoryId;
      }
      if (subcategoryId) {
        query.subcategoryId = subcategoryId;
      }
      if (name) {
        query.name = { $regex: name, $options: 'i' };  // Case-insensitive search for name
      }
      if (description) {
        query.description = { $regex: description, $options: 'i' };  // Case-insensitive search for description
      }
      if (minPrice || maxPrice) {
        query.price = {};
        if (minPrice) query.price.$gte = minPrice;  // Minimum price filter
        if (maxPrice) query.price.$lte = maxPrice;  // Maximum price filter
      }
  
      // Pagination
      const skip = (page - 1) * limit;
      
      const products = await Product.find(query)
        .skip(skip)
        .limit(limit)
        .exec();
  
      const total = await Product.countDocuments(query);  // Total products matching the query
  
      res.status(200).json({
        message: 'Products fetched successfully',
        products,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching products' });
    }
  };