import { Router } from "express";
import {auth} from "../controllers/authController.js"
const router=Router()
// 挂载路径
router.post("/login", authController)
export default router