import Navbar from "./components/Navbar";
import { useThemeStore } from "./store/themeStore";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import ProductUpdate from "./pages/ProductUpdate";
import DisplayProduct from "./pages/DisplayProduct";

function App() {
  const { theme } = useThemeStore();

  return (
    <div className="min-h-screen" data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/addproductpage" element={<AddProduct />} />
        <Route path="/update/:id" element={<ProductUpdate />} />
        <Route path="/displayProduct/:id" element={<DisplayProduct />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
