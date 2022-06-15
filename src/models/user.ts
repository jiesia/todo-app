import { Schema, model } from 'mongoose';

const userSchema = new Schema({
  username: String,
  password: String,
});

export default model('users', userSchema);
