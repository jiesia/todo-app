import jwt from 'jsonwebtoken';
import Todo from '@/models/todo';
import { JWTSecret } from '@/config';
import { Result } from '@/utils';

/**
 * 新建一个 todo
 *  1. 用户认证信息过期
 *  2. 创建成功
 * @param token 当前登录用户的 token
 * @param content 新建的 todo 内容
 * @returns 创建结果
 */
export async function create(token: string, content: string) {
  // 根据 token 获取当前新建 todo 的用户id
  let author: string;

  try {
    const result = jwt.verify(token, JWTSecret) as jwt.JwtPayload;
    author = result._id;
  } catch (err) {
    return new Result(401, '用户认证失败');
  }

  // 创建 todo
  const todo = await Todo.create({
    author,
    content,
  });

  return new Result(200, '创建成功', todo);
}

/**
 * 获取用户的所有 todo
 *  1. 用户认证信息过期
 *  2. 获取成功
 * @param token 当前登录用户的 token
 * @returns 当前用户的 todos
 */
export async function list(token: string) {
  // 根据 token 获取当前用户的所有 todos
  let author: string;

  try {
    const result = jwt.verify(token, JWTSecret) as jwt.JwtPayload;
    author = result._id;
  } catch (err) {
    return new Result(401, '用户认证失败');
  }

  // 获取 todo
  const todos = await Todo.find({ author });

  return new Result(200, '获取成功', todos);
}

/**
 * 删除 todo
 * @param token 当前登录用户的 token
 * @param todoId 需要删除的 todo id
 * @returns 是否删除成功
 */
export async function del(token: string, todoId: string) {
  // 根据 token 识别当前用户
  let author: string;

  try {
    const result = jwt.verify(token, JWTSecret) as jwt.JwtPayload;
    author = result._id;
  } catch (err) {
    return new Result(401, '用户认证失败');
  }

  // 查询需要删除的 todo
  const rmResult = await Todo.findByIdAndRemove(todoId, { author });
  if (!rmResult) { // 不存在当前 todo
    return new Result(400, 'todo 不存在');
  }

  return new Result(200, '删除成功', rmResult);
}
