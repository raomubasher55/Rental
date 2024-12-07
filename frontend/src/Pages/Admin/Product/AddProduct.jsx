import React, { useEffect, useState } from "react";
import { fetchAllProducts, createProduct, deleteProduct } from "@/api/ProductApi";
import { Button } from "@/components/ui/button"; // Import Button component
import { Input } from "@/components/ui/input";   // Import Input component
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";  // Explicit import for table components
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"; // Shadcn Dialog components
import Layout from "@/components/layout/Layout";

const AddProduct = () => {
  const [products, setProducts] = useState([]);
  const [productName, setProductName] = useState("");
  const [subcategoryId, setSubcategoryId] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchAllProducts();
      setProducts(data);
    };

    getProducts();
  }, []);

  const handleCreateProduct = async () => {
    await createProduct({ name: productName, subcategoryId, price });
    setProductName("");
    setSubcategoryId("");
    setPrice("");
    const data = await fetchAllProducts();
    setProducts(data);
  };

  const handleDeleteProduct = async (productId) => {
    await deleteProduct(productId);
    const data = await fetchAllProducts();
    setProducts(data);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl mb-4">Admin - Manage Products</h1>

      {/* Dialog Trigger */}
      <Dialog>
        <DialogTrigger asChild>
          <Button>Create New Product</Button>
        </DialogTrigger>

        {/* Dialog Content */}
        <DialogContent>
          <h2 className="text-lg mb-4">Create Product</h2>
          <Input
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="mb-4"
          />
          <Input
            placeholder="Subcategory ID"
            value={subcategoryId}
            onChange={(e) => setSubcategoryId(e.target.value)}
            className="mb-4"
          />
          <Input
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="mb-4"
          />
          <Button onClick={handleCreateProduct}>Create</Button>
        </DialogContent>
      </Dialog>

      {/* Products Table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>
                <Button onClick={() => handleDeleteProduct(product._id)}>
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

export default AddProduct;
