import Koa from 'koa';
import cors from '@koa/cors';
import logger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import koaStatic from 'koa-static';
import koaJWT from 'koa-jwt';
import connectDB from '@/db';
import userRoute from '@/routes/user';
import todoRoute from '@/routes/todo';
import { error } from '@/middlewares';
import { JWTSecret } from '@/config';

// 连接数据库
connectDB();

const app = new Koa();

// middlewares
app.use(error());

app.use(logger());
app.use(json());
app.use(cors());
app.use(bodyParser({ enableTypes: ['json', 'form', 'text'] }));
app.use(koaStatic(__dirname + '/public'));
app.use(koaJWT({
  secret: JWTSecret,
}).unless({
  path: [
    /^\/api\/user\/login/,
    /^\/api\/user\/register/,
  ]
}));

// routes
app.use(userRoute.routes()).use(userRoute.allowedMethods());
app.use(todoRoute.routes()).use(todoRoute.allowedMethods());

app.listen(3000);
