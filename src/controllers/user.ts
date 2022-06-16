import type { IMiddleware } from 'koa-router';
import * as userServices from '@/services/user';
import { getToken } from '@/utils';

// * 登录
export const login: IMiddleware = async ctx => {
  // TODO 参数校验
  const { username, password } = ctx.request.body;
  ctx.body = await userServices.login(username, password);
};

// * 注册
export const register: IMiddleware = async ctx => {
  // TODO 参数校验
  const { username, password } = ctx.request.body;
  ctx.body = await userServices.register(username, password);
};
