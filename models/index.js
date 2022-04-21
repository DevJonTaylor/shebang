import User from './User'
import Post from './Post'
import Comment from './Comment'
import Like from './Like'



User.hasMany(Post, { foreignKey: 'UserId', targetKey: 'id', sourceKey: 'id', onDelete: 'CASCADE', onUpdate: null })
User.hasMany(Comment, { foreignKey: 'UserId', targetKey: 'id', sourceKey: 'id', onDelete: 'CASCADE', onUpdate: null })
User.hasMany(Like,  { foreignKey: 'UserId', targetKey: 'id', sourceKey: 'id', onDelete: 'CASCADE', onUpdate: null })

Post.belongsTo(User, { foreignKey: 'UserId', targetKey: 'id', sourceKey: 'id' })
Post.hasMany(Comment, { foreignKey: 'PostId', targetKey: 'id', sourceKey: 'id', onDelete: 'CASCADE', onUpdate: null })
Post.hasMany(Like,  { foreignKey: 'PostId', targetKey: 'id', sourceKey: 'id', onDelete: 'CASCADE', onUpdate: null })

Comment.belongsTo(User, { foreignKey: 'UserId', targetKey: 'id', sourceKey: 'id' })
Comment.belongsTo(Post, { foreignKey: 'PostId', targetKey: 'id', sourceKey: 'id' })

export { User, Post, Comment, Like }