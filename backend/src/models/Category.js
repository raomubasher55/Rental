const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  Products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  subcategories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subcategory' }],
});

module.exports = mongoose.model('Category', categorySchema);
