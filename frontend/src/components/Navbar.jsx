import React from "react";
import { Link, useResolvedPath } from "react-router-dom";
import ThemeSelector from "./ThemeSelector";
import { ShoppingBag } from "lucide-react";
import { useProductStore } from "../store/productStore";

const Navbar = () => {
  const { products } = useProductStore();

  const { pathname } = useResolvedPath();
  const isProductsPage = pathname === "/";

  return (
    <div className="shadow-gray-200 w-full backdrop-blur-lg bg-base border-b border-base-content/10">
      <div className="max-w-7xl mx-auto">
        <div className="navbar px-4 min-h-[4rem] flex justify-around items-center">
          <div>
            <Link to="/" className="text-xl font-bold ">
              <span className="text-3xl italic bg-gradient-to-r from-20% to-35%">
              FlexiMart
              </span>
            </Link>
          </div>
          <div className="flex justify-center items-center gap-8">
            <div className="z-60">
              <ThemeSelector />
            </div>
            {isProductsPage && (
              <div className="relative ">
                <ShoppingBag />
                <span className="absolute badge rounded-full font-bold  badge-sm bg-primary py-2  top-[-15px] right-[-8px]  ">
                  
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
