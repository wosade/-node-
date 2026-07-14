import express from 'express'
import cors from 'cors'

const app = express()

// 中间件
app.use(cors())
// 直接解析body里面的请求体
app.use(express.json())

// 路由
app.get('/api/auth',)
app.use((req, res, next) => {
  console.log('1 start');
  next();
  console.log('1 end');
});
app.use((req, res, next) => {
  console.log('2 start');
  next();
  console.log('2 end');
});
// 输出：1 start → 2 start → 2 end → 1 end