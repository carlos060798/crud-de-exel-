
import { Router } from "express";
import { ProductController } from "../controllers/products.controller";


const  productRoutes = Router();

productRoutes.get("/products", ProductController.getAll);
productRoutes.get("/products/:id", ProductController.getOne);
productRoutes.post("/products", ProductController.create);
productRoutes.put("/products/:id", ProductController.update);
productRoutes.delete("/products/:id", ProductController.delete);

export default productRoutes;