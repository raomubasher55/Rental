import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Layout from "@/components/layout/Layout";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { useCategoryContext } from "@/contexts/CategoryContext";

const AddCategory = () => {
  const { addCategory, categories, editCategory, removeCategory } = useCategoryContext();
  const [categoryName, setCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null); 
  const [successMessage, setSuccessMessage] = useState("");

  const handleCreateCategory = () => {
    if (!categoryName.trim()) {
      alert("Please enter a category name.");
      return;
    }

    addCategory({ name: categoryName });
    setCategoryName("");
    setSuccessMessage("Category created successfully!");

    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleEditCategory = () => {
    if (!categoryName.trim()) {
      alert("Please enter a category name.");
      return;
    }

    editCategory(selectedCategory._id, { name: categoryName });
    setCategoryName("");
    setSelectedCategory(null); 
    setSuccessMessage("Category updated successfully!");

  };

  const handleUpdateClick = (category) => {
    setSelectedCategory(category); 
    setCategoryName(category.name); 
  };

  const handleDeleteClick = (category) => {
    removeCategory(category._id); 
    setSuccessMessage("Category deleted successfully!");
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Admin - Manage Categories</h1>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-2 text-green-700 bg-green-100 rounded">
          {successMessage}
        </div>
      )}

      {/* Create New Category Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            Create New Category
          </Button>
        </DialogTrigger>

        {/* Modal Content for Creating Category */}
        <DialogContent className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Create New Category</h2>
          <Input
            placeholder="Enter category name"
            value={categoryName}
            name="name"
            onChange={(e) => setCategoryName(e.target.value)}
            className="mb-4 border-gray-300 focus:border-blue-600 focus:ring focus:ring-blue-200"
          />
          <Button
            onClick={handleCreateCategory}
            className="w-full bg-green-600 text-white hover:bg-green-700"
          >
            Create
          </Button>
        </DialogContent>
      </Dialog>

      {/* Table Displaying Categories */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Update</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.map((category) => (
            <TableRow key={category._id}>
              <TableCell>{category.name}</TableCell>
              <TableCell>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="bg-yellow-600 text-white hover:bg-yellow-700"
                      onClick={() => handleUpdateClick(category)}
                    >
                      Update
                    </Button>
                  </DialogTrigger>

                  {/* Modal Content for Updating Category */}
                  <DialogContent className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold mb-4">
                      Update Category
                    </h2>
                    <Input
                      placeholder="Enter new category name"
                      value={categoryName}
                      name="name"
                      onChange={(e) => setCategoryName(e.target.value)}
                      className="mb-4 border-gray-300 focus:border-blue-600 focus:ring focus:ring-blue-200"
                    />
                    <Button
                      onClick={handleEditCategory}
                      className="w-full bg-yellow-600 text-white hover:bg-yellow-700"
                    >
                      Update
                    </Button>
                  </DialogContent>
                </Dialog>
              </TableCell>
              <TableCell>
                <Button
                  className="bg-red-600 text-white hover:bg-red-700"
                  onClick={() => handleDeleteClick(category)} // Directly delete the category
                >
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

export default AddCategory;
