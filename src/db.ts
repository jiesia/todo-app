import { connect } from 'mongoose';
import Debug from 'debug';

const debug = Debug('TODO:MongoDB');

// 连接 MongoDB 数据库
export default function connectDB() {
  connect('mongodb://localhost:27017/todo')
    .then(() => {
      debug('Connect Successfully');
    })
    .catch(err => {
      debug(`Connect Failed: ${err}`);
    });
};
