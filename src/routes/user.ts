import Router from 'koa-router';
import * as userControllers from '@/controllers/user';

const router = new Router({ prefix: '/api/user' });

// * 登录
router.post('/login', userControllers.login);
// * 注册
router.post('/register', userControllers.register);
// * 登录认证
router.post('/verify', userControllers.verify);

export default router;
