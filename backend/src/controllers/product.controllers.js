import { Product } from "../models/product.model.js";
import expressAsyncHandler from "express-async-handler";

export const postProduct = expressAsyncHandler(async (req, res) => {
  const { name, price, imageUrl } = req.body;

  if (!name || !price || !imageUrl) {
    return res.status(400).json({ message: "Please fill in all fields" });
  }

  const product = await Product.create({ name, price, imageUrl });

  res.status(201).json({
    message: "Product created successfully",
    _id: product._id,
    name: product.name,
    price: product.price,
    imageUrl: product.imageUrl,
  });
});

export const fetchAllProduct = expressAsyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json({
    status: "success",
    message: "Products retrieved successfully",
    count: products.length,
    products,
  });
});

export const UpdateProduct = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, price, imageUrl } = req.body;

  let product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Update the product fields
  product.name = name || product.name;
  product.price = price || product.price;
  product.imageUrl = imageUrl || product.imageUrl;

  // Save the updated product
  const updatedProduct = await product.save();

  res.status(200).json({
    message: "Product updated successfully",
    product: updatedProduct,
  });
});

export const fetchProductById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
 
    const product = await Product.findById({_id:id});
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({
      _id: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
});

export const deleteProductById = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById({ _id: id });
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  await Product.deleteOne({ _id: id });
  return res.status(200).json({ message: "product deleted successfully" });
});
