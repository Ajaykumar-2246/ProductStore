import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "../store/productStore";
import { MoveLeft } from "lucide-react";

const ProductUpdate = () => {
  const { id } = useParams();
  const { fetchProductById, fetchedById, updateProduct } = useProductStore();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetchProductById(id);
  }, [fetchProductById, id]);

  useEffect(() => {
    if (fetchedById) {
      setName(fetchedById.name || "");
      setPrice(fetchedById.price || "");
      setImageUrl(fetchedById.imageUrl || "");
      setDescription(fetchedById.description || "");
    }
  }, [fetchedById]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      name: name,
      price: price,
      imageUrl: imageUrl,
      description: description,
    };
    await updateProduct(id, updatedProduct);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="container mx-auto">
        {/* Back Button */}
        <div className="flex justify-start p-4">
          <button
            className="btn btn-ghost rounded-full text-lg font-semibold hover:bg-base-300 transition-colors"
            onClick={() => navigate("/")}
          >
            <MoveLeft className="mr-2" />
            Back to Products
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8 p-6">
          {/* Product Image */}
          <div className="w-full lg:w-1/3 flex justify-center items-center">
            {imageUrl && (
              <img
                src={imageUrl}
                alt={name}
                className="w-full max-w-lg h-96 object-cover rounded-lg shadow-2xl hover:shadow-3xl transition-shadow"
              />
            )}
          </div>

          {/* Update Form */}
          <div className="w-full lg:w-3/5 bg-base-100 shadow-xl rounded-lg p-4">
            <h2 className="text-3xl font-bold mb-8 text-primary">Update Product</h2>
            <form className="space-y-3" onSubmit={handleUpdate}>
              {/* Name Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-lg">Product Name</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter product name"
                  required
                />
              </div>

              {/* Price Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-lg">Price ($)</span>
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter price"
                  required
                />
              </div>

              {/* Image URL Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-lg">Image URL</span>
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="input input-bordered w-full focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter image URL"
                  required
                />
              </div>

              {/* Description Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-lg">Description</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="textarea resize-none textarea-bordered w-full focus:ring-2 focus:ring-primary focus:border-primary"
                  placeholder="Enter product description"
                  rows="5"
                  required
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 mt-8">
                <button
                  type="submit"
                  className="btn btn-primary rounded-full px-8 text-lg hover:bg-primary-focus transition-colors"
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;