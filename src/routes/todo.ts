import Router from 'koa-router';
const router = new Router({ prefix: '/api/todo' });

// * 查看所有 todo
router.get('/list');
// * 新增一个 todo
router.post('/create');
// * 删除 todo (批量删除)
router.delete('/');
// * 更新 todo 信息{ title, desc, done }
router.put('/:id');
