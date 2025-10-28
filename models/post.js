import mongoose from 'mongoose';
const { Schema } = mongoose;
import connection from '../config/index.js';
const postSchema = new Schema({
  title: String,
  content: String,
  likes: Number,
  UserId: { type: Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
});

const Post = connection.model('Post', postSchema);
export default Post