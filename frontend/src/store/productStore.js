import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

// const baseUrl="https://fleximart.onrender.com/api"

const baseUrl = " http://localhost:8000/api";
axios.defaults.withCredentials = true;

export const useProductStore = create((set, get) => ({
  products: [],
  productCount: null,
  isloading: false,
  fetchedById: null,

  // Reset fetchedById
  resetFetchedById: () => set({ fetchedById: null }),

  addProduct: async (formData) => {
    const { name, price, imageUrl, description } = formData;
    try {
      await axios.post(`${baseUrl}/product/postProduct`, {
        name,
        price,
        imageUrl,
        description,
      });
      toast.success("Product added successfully");
      await get().fetchAllProduct(); // Ensure the function is correctly called
    } catch (error) {
      // console.error("Error adding product:", error);
      toast.error("Failed to add product");
    }
  },

  fetchAllProduct: async () => {
    set({ isloading: true });
    try {
      const response = await axios.get(`${baseUrl}/product/getAllProduct`);
      set({
        products: response.data.products,
        productCount: response.data.count,
      });
    } catch (error) {
      // console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
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
      // console.error("Error deleting product:", error);
      toast.error("Failed to delete the product");
    }
  },

  fetchProductById: async (id) => {
    set({ isloading: true, fetchedById: null }); // Set loading state and reset fetchedById
    try {
      const res = await axios.get(`${baseUrl}/product/fetchById/${id}`);
      set({ fetchedById: res.data });
    } catch (error) {
      // console.error("Error fetching product by id:", error);
      toast.error("failed to fetch the product");
    } finally {
      set({ isloading: false }); // Reset loading state
    }
  },

  updateProduct: async (id, productDetails) => {
    const { name, price, imageUrl, description } = productDetails;
    try {
      await axios.put(`${baseUrl}/product/updateProduct/${id}`, {
        name,
        price,
        imageUrl,
        description,
      });
      toast.success("Product updated successfully");
      await get().fetchAllProduct();
    } catch (error) {
      // console.error("Error updating product:", error);
      toast.error("Failed to update the product");
    }
  },
}));
