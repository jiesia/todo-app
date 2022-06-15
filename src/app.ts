import Koa from 'koa';
import cors from '@koa/cors';
import logger from 'koa-logger';
import json from 'koa-json';
import bodyParser from 'koa-bodyparser';
import koaStatic from 'koa-static';
import connectDB from '@/db';
import userRoute from '@/routes/user';

// 连接数据库
connectDB();

const app = new Koa();

// middlewares
app.use(async (_, next) => {
  try {
    await next();
  } catch (err) {
    console.log('Error:', err);
  }
});

app.use(logger());
app.use(json());
app.use(cors());
app.use(bodyParser({ enableTypes: ['json', 'form', 'text'] }));
app.use(koaStatic(__dirname + '/public'));

// routes
app.use(userRoute.routes()).use(userRoute.allowedMethods());

app.listen(3000);
