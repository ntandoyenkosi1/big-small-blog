import mongoose from 'mongoose';
const { Schema } = mongoose;
import connection from '../config/index.js';
const chatSchema = new Schema({
  content: String,
  User1: { type: Schema.Types.ObjectId, ref: 'User' },
  User2: { type: Schema.Types.ObjectId, ref: 'User' },
  dateCreated: { type: Date, default: Date.now },
});
const Chat = connection.model('Chat', chatSchema);
export default Chat