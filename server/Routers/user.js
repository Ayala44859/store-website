import{Router} from "express";

import{addUser_signUp,getUserById,getAllUsers,updateUser,updateUserPassword,login}from "../Controllers/user.js"
import { check, checkManager } from "../Middlewares/check.js";
// import jwt from "../utils/jwt.js"
const router=Router();
router.post("/signup",addUser_signUp);
router.get("/:id",getUserById);
router.get("/",checkManager,getAllUsers);
router.put("/:id",check,updateUser);
router.put("/:id/password",check,updateUserPassword);
router.post("/login",login);

export default router;
