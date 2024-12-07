import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Layout from "@/components/layout/Layout";
import { useProductContext } from "@/contexts/ProductContext";
import { useCategoryContext } from "@/contexts/CategoryContext";  // Assuming you have CategoryContext
import { useSubcategoryContext } from "@/contexts/SubCategoryContext";  // Subcategory Context

const AddItem = () => {
  const { products, addProduct, removeProduct, editProduct } = useProductContext();
  const { categories } = useCategoryContext(); // Assuming you fetch categories from CategoryContext
  const { subcategories } = useSubcategoryContext(); // Subcategory Context
  
  // Form states
  const [productName, setProductName] = useState("");
  const [categoryId, setCategoryId] = useState(""); // Store selected category ID
  const [subcategoryId, setSubcategoryId] = useState(""); // Store selected subcategory ID
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [editingProductId, setEditingProductId] = useState(null); // Track editing product ID
  const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog visibility state
  
  // Log subcategories and categories to check data
  useEffect(() => {
    console.log("Categories:", categories);
    console.log("Subcategories:", subcategories);
  }, [categories, subcategories]);

  // Handle product creation
  const handleCreateProduct = async () => {
    if (!productName || !subcategoryId || !categoryId || !price || !description) {
      alert("Please fill in all fields");
      return;
    }
    const productData = {
      name: productName,
      description,
      price,
      subcategoryId,
      categoryId,
    };
    console.log(productData)
    addProduct(productData);
    clearForm();
    setIsDialogOpen(false); // Close the dialog after creating a product
  };

  // Handle product editing (pre-fill the dialog fields)
  const handleEditProduct = (product) => {
    setProductName(product.name);
    setCategoryId(product.categoryId);
    setSubcategoryId(product.subcategoryId);
    setPrice(product.price);
    setDescription(product.description);
    setEditingProductId(product._id);
    setIsDialogOpen(true); // Open the dialog for editing
  };

  // Handle product update
  const handleUpdateProduct = async () => {
    if (!productName || !subcategoryId || !categoryId || !price || !description) {
      alert("Please fill in all fields");
      return;
    }
    const updatedProduct = {
      name: productName,
      description,
      price,
      subcategoryId,
      categoryId,
    };
    await editProduct(editingProductId, updatedProduct);
    clearForm();
    setIsDialogOpen(false); // Close the dialog after updating
  };

  // Clear form fields after submission or reset
  const clearForm = () => {
    setProductName("");
    setCategoryId("");
    setSubcategoryId("");
    setPrice("");
    setDescription("");
    setEditingProductId(null);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Manage Products</h1>

      {/* Dialog Trigger for creating or editing a product */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setIsDialogOpen(true)}>
            {editingProductId ? "Edit Product" : "Create New Product"}
          </Button>
        </DialogTrigger>

        {/* Dialog Content for Product Form */}
        <DialogContent>
          <h2 className="text-lg mb-4">{editingProductId ? "Edit Product" : "Create Product"}</h2>
          <Input
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="mb-4"
          />

          {/* Category Dropdown */}
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Subcategory Dropdown */}
          <select
            value={subcategoryId}
            onChange={(e) => setSubcategoryId(e.target.value)}
            className="mb-4 p-2 border border-gray-300 rounded"
          >
            <option value="">Select Subcategory</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory._id} value={subcategory._id}>
                {subcategory.name}
              </option>
            ))}
          </select>

          <Input
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mb-4"
          />

          <Input
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mb-4"
          />
          
          <Button onClick={editingProductId ? handleUpdateProduct : handleCreateProduct}>
            {editingProductId ? "Update" : "Create"}
          </Button>
        </DialogContent>
      </Dialog>

      {/* Products Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell className="font-bold">Name</TableCell>
            <TableCell className="font-bold">Price</TableCell>
            <TableCell className="font-bold">Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>
                <Button onClick={() => handleEditProduct(product)}>Edit</Button>
                <Button onClick={() => handleDeleteProduct(product._id)} className="ml-2">
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AddItem;
