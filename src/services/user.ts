import User from '@/models/user';
import jwt from 'jsonwebtoken';
import { Result } from '@/utils';
import { JWTSecret } from '@/config';
/**
 * 登录服务
 *  1. 用户名或密码错误
 *  2. 登录成功
 * @param username 用户名
 * @param password 密码
 * @returns 登录成功返回 token
 */
export async function login(username: string, password: string) {
  // 判断用户名与密码是否正确
  const exist = await User.findOne({ username, password });
  if (!exist) {
    return new Result(400, '用户名或密码错误');
  }

  // * 登录，生成 token
  const payload = { username, _id: exist._id };
  const options = { expiresIn: 3600 * 24 };
  const token = jwt.sign(payload, JWTSecret, options);

  return new Result(200, '登陆成功', { token });
}

/**
 * 用户注册服务
 *  1. 用户名已存在，注册失败
 *  2. 注册成功
 * @param username 用户名
 * @param password 密码
 * @returns 注册结果 用户id
 */
export async function register(username: string, password: string) {
  // 验证用户名是否已经存在
  const exist = await User.findOne({ username });
  if (exist) {
    return new Result(400, '用户名已存在');
  }

  // * 新建用户
  const user = await User.create({
    username,
    password,
  });

  return new Result(200, '注册成功', { _id: user._id });
}

/**
 * 检验是否登录
 * @param token token
 * @returns 登录认证结果
 */
export async function verify(token: string) {
  try {
    const result = jwt.verify(token, JWTSecret);
    return new Result(200, '认证成功', result);
  } catch (err) {
    return new Result(400, '认证失败');
  }
}
