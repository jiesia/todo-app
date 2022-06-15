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
