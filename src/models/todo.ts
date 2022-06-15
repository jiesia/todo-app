import { Schema, model } from 'mongoose';

const todoSchema = new Schema({
  title: String,
  desc: String,
  done: Boolean,
  author: String,
  createTime: {
    type: Date,
    default: Date.now(),
  },
  updateTime: {
    type: Date,
    default: Date.now(),
  }
});

export default model('todos', todoSchema);
