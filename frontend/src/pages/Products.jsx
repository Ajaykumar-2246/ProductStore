import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/productStore";
import { EditIcon, Trash2Icon, CirclePlus, RefreshCw } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Products = () => {
  const {
    products,
    isloading,
    productsList = { count: 0 },
    fetchAllProduct,
    deleteProduct,
  } = useProductStore(); // Default productsList to prevent undefined errors
  const [isRefreshing, setIsRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllProduct();
  }, []);

  const handleRefresh = async () => {
    setIsRefresh(true);
    try {
      await fetchAllProduct();
    } finally {
      setIsRefresh(false);
    }
  };

  const handleDelete = async (id) => {
    await deleteProduct(id);
    fetchAllProduct();
  };

  const handleProductUpdate = async (productId) => {
    navigate(`/update/${productId}`);
  };

  // Log productsList and products to see the actual data being used
  useEffect(() => {
    console.log("productsList:", productsList);
    console.log("products:", products);
  }, [productsList, products]);

  return (
    <div className="py-6 px-4 sm:px-6 lg:px-8">
      {/* Header with Add Product and Refresh Button */}
      <div className="flex justify-between items-center mb-6">
        <Link to="/addproductpage">
          <button className="btn btn-primary gap-2">
            <CirclePlus className="size-5" /> Add Product
          </button>
        </Link>
        <button
          onClick={handleRefresh}
          className="btn btn-ghost gap-2"
          disabled={isRefreshing}
        >
          <RefreshCw
            className={`size-5 ${isRefreshing ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </div>

      {/* Product Grid */}
      {isloading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {productsList?.count > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300"
              >
                <figure className="px-3 pt-3">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="rounded-xl h-48 w-full object-cover"
                  />
                </figure>
                <div className="card-body p-4">
                  <h2 className="card-title text-lg">{product.name}</h2>
                  <p className="text-md font-semibold">
                    Price: ${product.price}
                  </p>
                  <div className="card-actions justify-end mt-1">
                    <button
                      onClick={() => handleProductUpdate(product._id)}
                      className="btn btn-sm btn-ghost hover:bg-primary/20"
                    >
                      <EditIcon className="size-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="btn btn-sm btn-ghost hover:bg-error/20"
                    >
                      <Trash2Icon className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-10">
              <p className="text-xl">No products available.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
