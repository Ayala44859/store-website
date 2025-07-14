import { Router } from "express";
import { checkManager } from "../Middlewares/check.js"
import uploadImage from '../Middlewares/uploadImage.js';
import { getAllProducts, getTotalPages, getProductById, addProduct, updatProduct, deleteProductById } from "../Controllers/product.js"

const router = Router();
router.get("/total/:category", getTotalPages);
router.get("/getById/:id", getProductById);
router.get("/:category", getAllProducts);
router.post("/", checkManager, uploadImage.single('file'), addProduct);
// router.post("/", checkManager, uploadImage , addProduct);
router.put("/:id", checkManager, updatProduct);
router.delete("/:id", checkManager, deleteProductById);


export default router;
