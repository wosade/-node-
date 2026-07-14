import { Router } from "express";

const router=Router()
// 挂载路径
router.post('/login',async(req,res,next)=>{
  const {username,password}=req.body
  
})