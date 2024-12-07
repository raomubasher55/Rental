import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { toast } from "react-toastify";
import { useSubcategoryContext } from "@/contexts/SubCategoryContext";
import { useCategoryContext } from "@/contexts/CategoryContext";

const SubcategoryManager = () => {
  const {
    subcategories,
    loading,
    addSubcategory,
    editSubcategory,
    removeSubcategory,
  } = useSubcategoryContext();
  const { categories } = useCategoryContext();

  const [subcategoryName, setSubcategoryName] = useState("");
  const [categoryId, setCategoryId] = useState(""); // Category ID state
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle add subcategory
  const handleAddSubcategory = () => {
    if (!subcategoryName.trim() || !categoryId.trim()) {
      toast.error("Please enter valid subcategory name and category");
      return;
    }
    addSubcategory({ name: subcategoryName, categoryId });
    setSubcategoryName(""); // Reset input
    setCategoryId(""); // Reset categoryId input
    setSuccessMessage("Subcategory added successfully!");
    setTimeout(() => setSuccessMessage(""), 3000); // Clear success message after 3 seconds
  };

  // Handle edit subcategory
  const handleEditSubcategory = () => {
    if (!subcategoryName.trim() || !categoryId.trim()) {
      toast.error("Please enter valid subcategory name and category");
      return;
    }
    editSubcategory(selectedSubcategory._id, { name: subcategoryName});
    setSubcategoryName(""); // Reset input
    setCategoryId(""); // Reset categoryId input
    setSelectedSubcategory(null); // Clear selected subcategory
    setSuccessMessage("Subcategory updated successfully!");
    setTimeout(() => setSuccessMessage(""), 3000); // Clear success message after 3 seconds
  };

  // Handle delete subcategory
  const handleDeleteSubcategory = (id) => {
    removeSubcategory(id);
    setSuccessMessage("Subcategory deleted successfully!");
    setTimeout(() => setSuccessMessage(""), 3000); // Clear success message after 3 seconds
  };

  // Handle update button click
  const handleUpdateClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setSubcategoryName(subcategory.name); // Pre-fill the input with the current name
    setCategoryId(subcategory.categoryId); // Pre-fill the categoryId input with current categoryId
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-6">Manage Subcategories</h1>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-4 p-2 text-green-700 bg-green-100 rounded">
          {successMessage}
        </div>
      )}

      {/* Add New Subcategory Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button >
            Create New Subcategory
          </Button>
        </DialogTrigger>

        <DialogContent className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Create New Subcategory</h2>
          <Input
            placeholder="Enter subcategory name"
            value={subcategoryName}
            name="name"
            onChange={(e) => setSubcategoryName(e.target.value)}
            className="mb-4 border-gray-300 focus:border-blue-600 focus:ring focus:ring-blue-200"
          />

          {/* Category Dropdown */}
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="mb-4 w-full border-gray-300 focus:border-blue-600 focus:ring focus:ring-blue-200 p-2"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>

          <Button
            onClick={handleAddSubcategory}
            className="w-full bg-green-600 text-white hover:bg-green-700"
          >
            Create
          </Button>
        </DialogContent>
      </Dialog>

      {/* Table Displaying Subcategories */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell className="font-bold">Name</TableCell>
            <TableCell className="font-bold">Update</TableCell>
            <TableCell className="font-bold">Delete</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subcategories.map((subcategory) => (
            <TableRow key={subcategory._id}>
              <TableCell>{subcategory.name}</TableCell>
              <TableCell>
                <Button
                  className="bg-yellow-600 text-white hover:bg-yellow-700"
                  onClick={() => handleUpdateClick(subcategory)} // Set subcategory for editing
                >
                  Update
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  className="bg-red-600 text-white hover:bg-red-700"
                  onClick={() => handleDeleteSubcategory(subcategory._id)} // Delete subcategory
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Edit Subcategory Dialog */}
      {selectedSubcategory && (
        <Dialog open={true}>
          <DialogTrigger asChild>
            <Button className="bg-yellow-600 text-white hover:bg-yellow-700">
              Update Subcategory
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Update Subcategory</h2>
            <Input
              placeholder="Enter new subcategory name"
              value={subcategoryName}
              name="name"
              onChange={(e) => setSubcategoryName(e.target.value)}
              className="mb-4 border-gray-300 focus:border-blue-600 focus:ring focus:ring-blue-200"
            />

            {/* Category Dropdown for Edit */}
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="mb-4 w-full border-gray-300 focus:border-blue-600 focus:ring focus:ring-blue-200 p-2"
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>

            <Button
              onClick={handleEditSubcategory}
              className="w-full bg-yellow-600 text-white hover:bg-yellow-700"
            >
              Update
            </Button>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default SubcategoryManager;
