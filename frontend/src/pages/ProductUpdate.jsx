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

  useEffect(() => {
    fetchProductById(id);
  }, [fetchProductById, id]);

  useEffect(() => {
    if (fetchedById) {
      setName(fetchedById.name || "");
      setPrice(fetchedById.price || "");
      setImageUrl(fetchedById.imageUrl || "");
    }
  }, [fetchedById]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      name: name,
      price: price,
      imageUrl: imageUrl,
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
            className="btn rounded-full btn-ghost text-lg font-semibold"
            onClick={() => navigate("/")}
          >
            <MoveLeft className="mr-2" />
            Back to Products
          </button>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 p-6">
          {/* Product Image */}
          <div className="w-full lg:w-1/3 flex justify-center">
            {imageUrl && (
              <img
                src={imageUrl}
                alt={name}
                className="w-full max-w-lg h-96 object-cover rounded-lg shadow-lg"
              />
            )}
          </div>

          {/* Update Form */}
          <div className="w-full lg:w-2/5 bg-base-100 shadow-xl rounded-lg p-6">
            <h2 className="text-3xl font-bold mb-6">Update Product</h2>
            <form className="space-y-4" onSubmit={handleUpdate}>
              {/* Name Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Product Name</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Enter product name"
                />
              </div>

              {/* Price Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Price ($)</span>
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Enter price"
                />
              </div>

              {/* Image URL Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Image URL</span>
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="input input-bordered w-full"
                  placeholder="Enter image URL"
                />
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 mt-6">
                <button type="submit" className="btn btn-primary rounded-full">
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