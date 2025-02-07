import express from "express";
import {
  deleteProductById,
  fetchAllProduct,
  fetchProductById,
  postProduct,
  UpdateProduct,
} from "../controllers/product.controllers.js";

const routers = express.Router();

routers.post("/postProduct", postProduct);
routers.get("/getAllProduct", fetchAllProduct);
routers.put("/updateProduct/:id", UpdateProduct);
routers.get("/fetchById/:id", fetchProductById);
routers.delete("/deleteProduct/:id", deleteProductById);

export default routers;
