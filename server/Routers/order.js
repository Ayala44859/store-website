import{Router} from "express";

import{getAllOrder,addOrder,deleteOrderById,getAllOrderByClientCode,updatOrder}from "../Controllers/order.js"
import { check, checkManager } from "../Middlewares/check.js";

const router=Router();
router.get("/",checkManager,getAllOrder);
router.post("/",check,addOrder);
router.delete("/:id",checkManager,deleteOrderById);
router.get("/clientCode/:clientCode", getAllOrderByClientCode);
router.put("/:id",checkManager,updatOrder);


export default router;
