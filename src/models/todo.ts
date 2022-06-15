import { Schema, model } from 'mongoose';

const todoSchema = new Schema({
  author: String,
  content: String,
  done: {
    type: Boolean,
    default: false,
  },
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
