import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const baseUrl="https://fleximart.onrender.com/api"

// const localhostUrl =" http://localhost:8000/api"
axios.defaults.withCredentials = true;

export const useProductStore = create((set, get) => ({
  products: [],
  productCount:null,
  isloading: false,
  fetchedById: null,

  addProduct: async (formData) => {
    const { name, price, imageUrl } = formData;
    try {
      await axios.post(`${baseUrl}/product/postProduct`, { name, price, imageUrl });
      toast.success("Product added successfully");
      await get().fetchAllProduct(); // Ensure the function is correctly called
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
    }
  },

  fetchAllProduct: async () => {
    set({ isloading: true });
    try {
      const response = await axios.get(`${baseUrl}/product/getAllProduct`);
      set({ products: response.data.products,productCount:response.data.count});
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      set({ isloading: false }); // Set loading state only once
    }
  },

  deleteProduct: async (id) => {
    try {
      await axios.delete(`${baseUrl}/product/deleteProduct/${id}`);
      toast.success("Product successfully deleted");
      await get().fetchAllProduct(); // Refresh products after deletion
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete the product");
    }
  },

  fetchProductById: async (id) => {
    try {
      const res = await axios.get(`${baseUrl}/product/fetchById/${id}`);
      set({ fetchedById: res.data });
    } catch (error) {
      console.error("Error fetching product by id:", error);
    }
  },

  updateProduct: async (id, productDetails) => {
    const { name, price, imageUrl } = productDetails;
    try {
      await axios.put(`${baseUrl}/product/updateProduct/${id}`, { name, price, imageUrl });
      toast.success("Product updated successfully");
      await get().fetchAllProduct(); // Refresh the products list after update
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update the product");
    }
  },
}));
