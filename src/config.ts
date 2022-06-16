// ! JWT 密钥, 不可泄漏!!!
export const JWTSecret = 'todo-app-server-jwt';

// 不需要身份认证的接口
export const ignoreVerifyPaths = [
  /^\/api\/user\/login/,
  /^\/api\/user\/register/,
];
