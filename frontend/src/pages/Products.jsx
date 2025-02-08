import React, { useEffect, useState } from "react";
import { useProductStore } from "../store/productStore";
import { EditIcon, Trash2Icon, CirclePlus, RefreshCw } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Products = () => {
  const { products, productCount, isloading, fetchAllProduct, deleteProduct } =
    useProductStore();
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

  const handleDisplayProduct=async (productId) => {
    navigate(`/displayProduct/${productId}`)
  }

  return (
    <div className="p-4 bg-base-200">
      {/* Header Section */}
      <div className="flex md:flex-row justify-between items-center mb-6 gap-4">
        <Link to="/addproductpage">
          <button className="btn btn-primary rounded-full gap-2">
            <CirclePlus className="size-5" /> Add Product
          </button>
        </Link>
        <button
          onClick={handleRefresh}
          className="btn rounded-full btn-ghost gap-2"
          disabled={isRefreshing}
        >
          <RefreshCw
            className={`size-5 ${isRefreshing ? "animate-spin" : ""}`}
          />
          Refresh
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {productCount > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              onClick={()=>handleDisplayProduct(product._id)}
              className="card bg-base-100 shadow-2xl hover:shadow-2xl transition-shadow duration-300"
            >
              <figure className="px-4 pt-4">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="rounded-xl h-48 w-full object-cover"
                />
              </figure>
              <div className="card-body p-4">
                <h2 className="card-title text-lg">{product.name}</h2>
                <p className="text-md font-semibold">Price: ${product.price}</p>
                <div className="card-actions justify-end mt-4">
                  <button
                    onClick={() => handleProductUpdate(product._id)}
                    className="btn btn-sm rounded-full btn-outline btn-primary"
                  >
                    <EditIcon className="size-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="btn btn-sm rounded-full btn-outline btn-error"
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
    </div>
  );
};

export default Products;
