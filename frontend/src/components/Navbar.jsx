import React from "react";
import { Link, useLocation, useResolvedPath } from "react-router-dom";
import ThemeSelector from "./ThemeSelector";
import { ShoppingBag } from "lucide-react";
import { useProductStore } from "../store/productStore";

const Navbar = () => {
  const { productCount } = useProductStore();

  const { pathname } = useLocation();
  const isProductsPage = pathname === "/";

  return (
    <div className="shadow-gray-200 w-full backdrop-blur-lg bg-base border-b border-base-content/10">
      <div className="max-w-7xl px-5 mx-auto">
        <div className="navbar px-3 min-h-[4rem] flex justify-around items-center">
          <div>
            <Link to="/" className="text-xl font-bold ">
              <span className="text-3xl italic bg-gradient-to-r from-primary/60 via-secondary/60  to-accent/50 bg-clip-text text-transparent">
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
                  {productCount}
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
