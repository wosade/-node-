import { NextFunction,Request,Response } from "express";
import * as authService from '../services/authService.js'
export async function login(req:Request,res:Response,next:NextFunction){
  try{
    const {username,password}=req.body
    const result=await authService.loginUser(username,password)
    res.json({data:result})
  }catch(err){
    next(err)
  }
}