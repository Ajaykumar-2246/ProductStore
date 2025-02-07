import React, { useState } from "react";
import { useProductStore } from "../store/productStore";
import { useNavigate } from "react-router-dom";
import { MoveLeft } from "lucide-react";

const AddProduct = () => {
  const { addProduct } = useProductStore();
  const navigate = useNavigate();

  // State for form fields
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    imageUrl: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!formData.name || !formData.price || !formData.imageUrl) {
      alert("Please fill in all fields.");
      return;
    }

    // Add product and navigate back to products list
    await addProduct(formData);
    navigate("/"); // Navigate back to the home or product list page
  };

  const handleCancel = () => {
    navigate("/"); // Navigate back to the home or product list page
  };

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="container mx-auto">
        {/* Back Button */}
        <div className="flex justify-start p-4">
          <button
            className="btn btn-ghost text-lg font-semibold"
            onClick={() => navigate("/")}
          >
            <MoveLeft className="mr-2" />
            Back to Products
          </button>
        </div>

        {/* Form Container */}
        <div className="flex justify-center items-center mt-4">
          <div className="w-full max-w-md bg-base-100 shadow-xl rounded-lg p-6">
            <h1 className="text-3xl font-bold text-center mb-6">Add Product</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Product Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Enter product name"
                />
              </div>

              {/* Price */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Price ($)</span>
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="Enter price"
                />
              </div>

              {/* Image URL */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Image URL</span>
                </label>
                <input
                  type="text"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="https://source.unsplash.com/random/300x200"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="btn btn-error rounded-full"
                >
                  Cancel
                </button>
                <button type="submit" className="btn rounded-full btn-primary">
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;