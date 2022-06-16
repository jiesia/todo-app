import { IMiddleware } from 'koa-router';
import * as todoServices from '@/services/todo';
import { IState } from '@/types';

// * 查询所有 todo
export const list: IMiddleware<IState> = async ctx => {
  const { userId: author } = ctx.state;
  ctx.body = await todoServices.list(author);
};

// * 新增一个 todo
export const create: IMiddleware<IState> = async ctx => {
  // TODO 参数校验
  const { content } = ctx.request.body;
  const { userId: author } = ctx.state;
  ctx.body = await todoServices.create(author, content);
};

// * 删除一个 todo
export const del: IMiddleware<IState> = async ctx => {
  // TODO 参数校验
  const { todoId } = ctx.request.body;
  const { userId: author } = ctx.state;
  ctx.body = await todoServices.del(author, todoId);
};

// * 更新 todo 信息 { title, desc, done }
export const update: IMiddleware<IState> = async ctx => {
  // TODO 参数校验
  const { todoId, updateInfo } = ctx.request.body;
  const { userId: author } = ctx.state;
  ctx.body = await todoServices.update(author, todoId, updateInfo);
};
