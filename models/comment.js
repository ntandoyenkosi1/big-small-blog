import mongoose from 'mongoose';
const { Schema } = mongoose;
import connection from '../config/index.js';
const commentSchema = new Schema({
  content: String,
  likes: Number,
  PostId: { type: Schema.Types.ObjectId, ref: 'Post' },
  UserId: { type: Schema.Types.ObjectId, ref: 'User' },
  dateCreated: { type: Date, default: Date.now },
});
const Comment = connection.model('Comment', commentSchema);

export default Comment