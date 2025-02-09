import React, { useState } from "react";
import { useProductStore } from "../store/productStore";
import { useNavigate } from "react-router-dom";
import { MoveLeft } from "lucide-react";

const AddProduct = () => {
  const { addProduct } = useProductStore();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    imageUrl: "",
    description: "", // Add description field
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (
      !formData.name ||
      !formData.price ||
      !formData.imageUrl ||
      !formData.description
    ) {
      alert("Please fill in all fields.");
      return;
    }

    // Validate price
    if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    // Add product and navigate back to products list
    await addProduct({
      ...formData,
      price: parseFloat(formData.price), // Ensure price is a number
    });
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
            className="btn btn-ghost text-lg rounded-full font-semibold"
            onClick={() => navigate("/")}
          >
            <MoveLeft className="mr-2" />
            Back to Products
          </button>
        </div>

        {/* Form Container */}
        <div className="flex justify-center items-center mt-4">
          <div className="w-full w-2/5 max-w-md bg-base-100 shadow-xl rounded-lg p-6">
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
                  required
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
                  min="0"
                  step="0.01"
                  required
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
                  required
                />
              </div>

              {/* Description */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Description</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full"
                  placeholder="Enter product description"
                  rows="4"
                  required
                />
              </div>

              {/* Image Preview */}
              {formData.imageUrl && (
                <div className="flex justify-center mt-4">
                  <img
                    src={formData.imageUrl}
                    alt="Product Preview"
                    className="w-48 h-48 object-cover rounded-lg"
                  />
                </div>
              )}

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
