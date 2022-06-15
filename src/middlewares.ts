import { Middleware } from 'koa';
import { Result } from '@/utils';

// * 错误处理中间件
export function error(): Middleware {
  return async (ctx, next) => {
    try {
      await next();
    } catch (err: any) {
      if (err?.message === 'Authentication Error') {
        return ctx.body = new Result(401, '用户认证失败');
      }
      console.log('Error:', err);
    }
  };
}
