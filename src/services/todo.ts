import jwt from 'jsonwebtoken';
import Todo from '@/models/todo';
import { JWTSecret } from '@/config';
import { Result } from '@/utils';

/**
 * 新建一个 todo
 * @param author 当前登录用户的 id
 * @param content 新建的 todo 内容
 * @returns 创建结果
 */
export async function create(author: string, content: string) {
  // 创建 todo
  const todo = await Todo.create({ author, content });
  return new Result(200, '创建成功', todo);
}

/**
 * 获取当前用户所有的 todo
 * @param author 当前登录用户的 id
 * @returns 当前用户的 todos
 */
export async function list(author: string) {
  // 获取 todo
  const todos = await Todo.find({ author });
  return new Result(200, '获取成功', todos);
}

/**
 * 删除 todo
 * @param author 当前登录用户的 id
 * @param todoId 需要删除的 todo id
 * @returns 是否删除成功
 */
export async function del(author: string, todoId: string) {
  // 查询需要删除的 todo
  const rmResult = await Todo.deleteOne({ _id: todoId, author });
  if (rmResult.deletedCount === 0) { // 不存在当前 todo
    return new Result(400, '需要被删除的 todo 不存在');
  }

  return new Result(200, '删除成功', rmResult);
}

interface IUpdateParams {
  content?: string,
  done?: boolean,
}

/**
 * 修改 todo
 * @param author 当前登录用户的 id
 * @param todoId 需要修改的 todo id
 * @param updateInfo 需要修改的信息
 * @returns 修改结果
 */
export async function update(author: string, todoId: string, updateInfo: IUpdateParams) {
  // 修改 todo
  const updateResult = await Todo.updateOne({ _id: todoId, author }, { ...updateInfo, updateTime: Date.now() });
  if (updateResult.matchedCount === 0) { // 不存在当前 todo
    return new Result(400, '需要被修改的 todo 不存在');
  }

  return new Result(200, '修改成功');
}
