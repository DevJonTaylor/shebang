import { User, Post, Comment, Like } from '../models'
import { postData, commentData, userData, likeData } from './data'

function msg(msg) {
  console.log(`\n----- ${msg} -----`)
}

async function sync(...models) {
  for(const model of models) {
    await model.sync({ force: true })
    msg(`${model.name.toUpperCase()} CREATED`)
  }
}

async function bulkCreate(model, data) {
  await model.bulkCreate(data)
  msg(`${model.name.toUpperCase()} SEEDED`)
}

(async () => {
 try{
   await sync(User, Post, Comment, Like)
   await bulkCreate(User, userData)
   await bulkCreate(Post, postData)
   await bulkCreate(Comment, commentData)
   await bulkCreate(Like, likeData)
   process.exit(1)
 } catch(err) {
   console.error(err)
 }
})()