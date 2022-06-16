import { IMiddleware } from 'koa-router';
import * as todoServices from '@/services/todo';
import { getToken } from '@/utils';

// * 查询所有 todo
export const list: IMiddleware = async ctx => {
  // TODO 参数校验
  const { content } = ctx.request.body;
  const token = getToken(ctx.header.authorization);
  ctx.body = await todoServices.list(token);
};

// * 新增一个 todo
export const create: IMiddleware = async ctx => {
  // TODO 参数校验
  const { content } = ctx.request.body;
  const token = getToken(ctx.header.authorization);
  ctx.body = await todoServices.create(token, content);
};

// * 删除一个 todo
export const del: IMiddleware = async ctx => {

};

// * 更新 todo 信息 { title, desc, done }
export const update: IMiddleware = async ctx => {

};
