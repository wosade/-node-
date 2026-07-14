import express from 'express'
import cors from 'cors'
import { log } from 'console'
import authRouter from "./routes/auth.js";

const app = express()

// 中间件
app.use(cors())
// 直接解析body里面的请求体
app.use(express.json())

// 路由
app.use("/api/auth", authRouter);
app.listen('3030',()=>{
  console.log(`server running on 3030`)
})