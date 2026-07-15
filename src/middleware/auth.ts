import { Request } from "express";
import { AppError } from "./errorHandle.js";
import jwt from 'jsonwebtoken'
import { config } from "process";
interface authrequst extends Request{
  id:string

}
// 中间件 鉴权token
export async function requireJwt(req:authrequst,res:,next) {
  const headers=req.headers.authorization||''
  if(!headers||!headers.startsWith(('Bearer'))){
    throw new AppError(400,'token失效力')
  }
  // 干掉七位 'bearer '只保留空格后面的字母
  const token=headers.slice(7)
  const JWT_SECRET = process.env.JWT_SECRET
  try{
    const payload=jwt.verify(token,JWT_SECRET) as {userid:string}
    req.id=payload.userid
    next
  }
  catch(err){
    throw new AppError(400,'token错误')
  }
}