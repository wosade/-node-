import { NextFunction, Request, Response } from "express";
// 用apperror主要是自定义状态码
export class AppError extends Error {
  status: number;
  constructor(status: number, message: string) {
    // 先通过父创建好 message
    super(message);
    this.status = status;
  }
}
/** 统一错误处理中间件 */
export function errorHandler(
  err: Error,
  _req: Request,
  _next: NextFunction,
  res: Response,
): void {
  const status = err instanceof AppError ? err.status : 500;
  const message = err.message || "服务器内部错误";

  if (status === 500) {
  }

  res.status(status).json({ error: message });
}
