import { Middleware } from 'koa';
import jwt from 'jsonwebtoken';
import { JWTSecret } from '@/config';
import { Result, getToken } from '@/utils';
import { IState } from '@/types';

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

// * 登录认证
export function verify(ignoreVerifyPaths: RegExp[]): Middleware<IState> {
  return async (ctx, next) => {
    // 当前请求路径不需要认证时进入下一个中间件
    if (ignoreVerifyPaths.some(p => p.test(ctx.request.path))) {
      return await next();
    };

    // 当前请求路径需要认证, 根据 token 信息获取登录用户的 id
    const token = getToken(ctx.header.authorization);
    let userId: string;

    try {
      const result = jwt.verify(token, JWTSecret) as jwt.JwtPayload;
      userId = result._id;
    } catch {
      return ctx.body = new Result(401, '用户认证失败');
    }

    // ! 保存 userId
    ctx.state.userId = userId;
    await next();
  };
}
