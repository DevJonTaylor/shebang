import User from './User'
import Post from './Post'
import Comment from './Comment'
import Like from './Like'

const onEvents = { onDelete: 'CASCADE', onUpdate: null }

User.hasMany(Post, { foreignKey: 'UserId', targetKey: 'id', ...onEvents })
User.hasMany(Comment, { foreignKey: 'UserId', targetKey: 'id', ...onEvents })
User.hasMany(Like,  { foreignKey: 'UserId', targetKey: 'id', ...onEvents })

Post.author = Post.belongsTo(User, { as: 'author', foreignKey: 'UserId', targetKey: 'id' })
Post.hasMany(Comment, { foreignKey: 'PostId', targetKey: 'id', ...onEvents })
Post.hasMany(Like,  { foreignKey: 'PostId', targetKey: 'id', ...onEvents })

Comment.responder = Comment.belongsTo(User, { as: 'responder', foreignKey: 'UserId', targetKey: 'id' })
Comment.belongsTo(Post, { foreignKey: 'PostId', targetKey: 'id' })

export { User, Post, Comment, Like }