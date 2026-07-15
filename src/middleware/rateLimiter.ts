import { NextFunction, Request, Response } from "express"
import redis from "../lib/redies.js"

interface RateLimitOptions{
  windowMs:number
  max:number
  keyprefix:string
  message:string
  keyGenerator?:(req:Request)=>string
}
// 返回 req的ip作为特殊标识符 或者 
function defaultKeyGenerator(req:Request){
  return req.ip || req.socket.remoteAddress;
}
// 限流窗口 减少请求次数
export function createRateLimiter(optoins:RateLimitOptions){
   const {
     windowMs,
     max,
     keyprefix,
     message = "请求过于频繁，请稍后再试",
     keyGenerator = defaultKeyGenerator,
   } = optoins;
  return  async(req:Request,res:Response,next:NextFunction)=>{ 
    const key = `${keyprefix}:${keyGenerator(req)}`;
    try{
      const current=await redis.incr(key)
      // 首次请求设置窗口过期时间
      if (current === 1) {
        await redis.pexpire(key, windowMs);
      }
      // 设置标准限流响应头
      res.setHeader('X-RateLimit-Limit', max);
      res.setHeader('X-RateLimit-Remaining', Math.max(0, max - current));
      if(current>max){
        const ttl=await redis.pttl(key)
        res.setHeader('Retry-After', Math.ceil(Math.max(0, ttl) / 1000));
      }
    }
  }
}