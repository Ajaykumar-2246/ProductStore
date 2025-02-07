import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

const baseUrl =import.meta.env.MODE=== "development" ? "http://localhost:8000/api/product" :"https://fleximart.onrender.com/api/product"
axios.defaults.withCredentials = true;

export const useProductStore = create((set) => ({
  products: [],
  productsList:[],
  isloading: false,
  fetchedById: null,

  addProduct: async (formData) => {
    const { name, price, imageUrl } = formData;
    try {
      const res = await axios.post(`${baseUrl}/postProduct`, {
        name,
        price,
        imageUrl,
      });
      toast.success("Product added successfully");
      // Fetch updated product list to reflect changes in UI
      fetchAllProduct();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  },

  fetchAllProduct: async () => {
    set({ isloading: true });
    try {
      const response = await axios.get(`${baseUrl}/getAllProduct`);
      set({ products: response.data.products,productsList:response.data });
      set({ isloading: false });
    } catch (error) {
      console.error("Error fetching products:", error);
      set({ isloading: false });
    } finally {
      set({ isloading: false });
    }
  },
  deleteProduct: async (id) => {
    try {
      await axios.delete(`${baseUrl}/deleteProduct/${id}`);
      toast.success("product successfully deleted");
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("failed to delete the product");
    }
  },

  fetchProductById: async (id) => {
    try {
      const res = await axios.get(`${baseUrl}/fetchById/${id}`);
      set({ fetchedById: res.data });
    } catch (error) {
      console.error("Error fetching product by id:", error);
    }
  },

  updateProduct: async (id, productDetails) => {
    const { name, price, imageUrl } = productDetails;
    try {
      const res = await axios.put(`${baseUrl}/updateProduct/${id}`, {
        name,
        price,
        imageUrl,
      });
      // fetchAllProduct();
      toast.success("product updated successfully");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("failed to update the product");
    }
  },
}));
