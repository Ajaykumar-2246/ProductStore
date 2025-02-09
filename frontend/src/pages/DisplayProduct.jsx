import React, { useEffect } from "react";
import { useProductStore } from "../store/productStore";
import { useParams, useNavigate } from "react-router-dom";
import { MoveLeft } from "lucide-react";

const DisplayProduct = () => {
  const { fetchProductById, fetchedById, resetFetchedById } = useProductStore();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProductById(id);
  }, [fetchProductById, id, resetFetchedById]);

  if (!fetchedById) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <p className="text-xl  font-semibold"> Loading product details...</p>
      </div>
    );
  }

  if (!fetchedById?.name) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200">
        <p className="text-xl font-semibold text-red-500">
          Product not found or an error occurred.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-4">
      <div className="container mx-auto">
        {/* Back Button */}
        <div className="flex justify-start p-4">
          <button
            className="btn btn-ghost rounded-full text-lg font-semibold hover:bg-base-100 transition-all"
            onClick={() => navigate("/")}
          >
            <MoveLeft className="mr-2" />
            Back to Products
          </button>
        </div>

        {/* Product Details */}
        <div className="p-6 flex flex-col md:flex-row gap-8 bg-base-100 rounded-lg shadow-lg">
          {/* Product Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              className="w-full max-w-md h-96 rounded-lg object-cover shadow-md"
              src={fetchedById.imageUrl}
              alt={fetchedById.name || "Product image"}
            />
          </div>

          {/* Product Information */}
          <div className="w-full md:w-1/2 flex flex-col justify-center gap-4">
            <h1 className="text-3xl font-bold text-primary">
              Product Name: {fetchedById.name}
            </h1>
            <p className="text-lg font-semibold text-secondary">
              Price: ${fetchedById.price}
            </p>
            <p className="text-gray-500 text-sm text-justify font-md
            ">
              Description: {fetchedById.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisplayProduct;
