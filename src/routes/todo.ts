import Router from 'koa-router';
import * as todoControllers from '@/controllers/todo';

const router = new Router({ prefix: '/api/todo' });

// * 查看所有 todo
router.get('/', todoControllers.list);
// * 新增一个 todo
router.post('/', todoControllers.create);
// * 删除 todo (批量删除)
router.delete('/', todoControllers.del);
// * 更新 todo 信息{ title, desc, done }
router.put('/', todoControllers.update);

export default router;
