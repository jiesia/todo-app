import User from '@/models/user';

export async function login(username: string, password: string) {
  const user = await User.findOne({ username, password });
  if (!user) {
    // TODO 不存在用户，用户名密码错误
    return;
  }


  return { username, password };
}

export async function register(username: string, password: string) {
  await User.create({
    username,
    password,
  });

  return '注册成功';
}
