import { AppError } from "../middleware/errorHandle.js"
import { findUserbyUsername } from "../models/user.js"
import bcrypt from 'bcryptjs'
/** 签发 token + refreshToken */
function generateTokens(user: UserPayload): TokenPair {
  const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, {
    expiresIn: JWT_EXPIRES_IN,
  } as jwt.SignOptions);
  const refreshToken = jwt.sign(
    { id: user.id, type: 'refresh' },
    JWT_SECRET,
    { expiresIn: JWT_REFRESH_EXPIRES_IN } as jwt.SignOptions,
  );

  return { token, refreshToken };
}
export async function loginUser(username:string,password:string){
  const user=await findUserbyUsername(username)
  if(!user){
    throw new AppError(401,'用户错误')
  }
  // 对比密码 
  const match=await bcrypt.compare(password,user.password)
  if(!match){
    throw new AppError(401,'')
  }

}