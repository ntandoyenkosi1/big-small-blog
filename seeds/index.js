import userData from "./users.js"
// keep other seed data imports for future use
import postData from "./posts.js"
import commentData from "./comments.js"
import chatData from "./chats.js"

import bcrypt from "bcrypt"

import connection from "../config/index.js"
import User from "../models/user.js"
import Post from "../models/post.js"
import Chat from "../models/chat.js"
import Comment from "../models/comment.js"

const SALT_ROUNDS = 10



async function seedDB() {
  try {
    console.log('Seeder: waiting for mongoose connection...')
    // connection is a mongoose.Connection; wait for readyState
    if (connection.readyState !== 1) {
      await new Promise((resolve, reject) => {
        connection.once('connected', resolve)
        connection.once('error', reject)
      })
    }

    console.log('Seeder: connected to MongoDB')

    // clear existing users
    await User.deleteMany({})
    console.log('Seeder: cleared existing users')

    // hash passwords and prepare documents
    const usersToInsert = await Promise.all(
      userData.map(async (u) => {
        const hashed = await bcrypt.hash(u.password, SALT_ROUNDS)
        return { ...u, password: hashed }
      })
    )

    const created = await User.insertMany(usersToInsert)
    console.log(`Seeder: inserted ${created.length} users`)

    const postsToInsert = await Promise.all(
      postData.map(async (u, index) => {
        let x
        if (index % 2 == 0) {
          x = await User.find({})
        } else {
          x = await User.find({})
        }

        return { ...u, UserId: x[0]._id }
      })
    )
    await Post.deleteMany({})
    console.log('Seeder: cleared existing posts')

    const createdPosts = await Post.insertMany(postsToInsert)
    console.log(`Seeder: inserted ${createdPosts.length} posts`)

    const commentsToInsert = await Promise.all(
      commentData.map(async (u, index) => {
        let x
        let y
        if (index % 2 == 0) {
          x = await User.find({})
          y = await Post.find({})
        } else {
          x = await User.find({})
          y = await Post.find({})
        }
        return { ...u, UserId:index % 2 == 0?x[0]._id:x[1]._id, PostId: index % 2 == 0?y[1]._id:[0]._id }
      })
    )
    await Comment.deleteMany({})
    console.log('Seeder: cleared existing comments')

    const createdComment = await Comment.insertMany(commentsToInsert)
    console.log(`Seeder: inserted ${createdComment.length} comments`)

    const chatsToInsert = await Promise.all(
      chatData.map(async (u, index) => {
        let x = await User.find({})
        return { ...u, User1: x % 2 == 0 ? x[0]._id : x[1]._id, User2: x % 2 == 0 ? x[1]._id : x[1]._id }
      })
    )

    await Chat.deleteMany({})
    console.log('Seeder: cleared existing posts')

    const createdChats = await Chat.insertMany(chatsToInsert)
    console.log(`Seeder: inserted ${createdChats.length} posts`)
  } catch (err) {
    console.error('Seeder: error seeding users', err)
  } finally {
    // close the mongoose connection to allow process to exit
    try {
      await connection.close()
      console.log('Seeder: connection closed')
    } catch (e) {
      console.error('Seeder: error closing connection', e)
    }
  }
}

// Run the seeder if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}` || process.argv[1].endsWith('seeds')) {
  seedDB()
}