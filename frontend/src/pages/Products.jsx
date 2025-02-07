import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/productStore";
import { EditIcon, Trash2Icon, CirclePlus, RefreshCw } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Products = () => {
  const { products, isloading, fetchAllProduct, deleteProduct } = useProductStore();
  const [isRefreshing, setIsRefresh] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllProduct();
  }, [fetchAllProduct]);

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

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mt-4 mb-6">
        <Link to="/addproductpage">
          <button className="btn btn-primary flex items-center gap-2">
            <CirclePlus className="w-5 h-5" /> Add Product
          </button>
        </Link>
        <button onClick={handleRefresh} className="btn btn-ghost">
          <RefreshCw className={`w-5 h-5 ${isRefreshing ? "animate-spin" : ""}`} />
        </button>
      </div>

      {isloading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <div key={product._id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <figure className="px-4 pt-4">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="rounded-xl h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{product.name}</h2>
                <p className="text-lg font-semibold">Price: ${product.price}</p>
                <div className="card-actions justify-end">
                  <button
                    onClick={() => handleProductUpdate(product._id)}
                    className="btn btn-sm btn-outline btn-primary"
                  >
                    <EditIcon className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-sm btn-outline btn-error"
                  >
                    <Trash2Icon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10">
          <p className="text-xl">No products available.</p>
        </div>
      )}
    </div>
  );
};

export default Products;