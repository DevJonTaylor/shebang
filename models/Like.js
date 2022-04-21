import { sequelize, INTEGER, Model } from '../lib/config'

class Like extends Model {}

Like.init({
  PostId: {
    type: INTEGER,
    reference: {
      table: 'posts',
      model: 'Post',
      foreignKey: true,
      key: 'id'
    }
  },
  UserId: {
    type: INTEGER,
    reference: {
      table: 'users',
      model: 'User',
      foreignKey: true,
      key: 'id'
    }
  }
}, {
  sequelize,
  freezeTableName: true,
  timestamps: false,
  underscored: true,
  tableName: 'Likes',
  modelName: 'Like'
})


export default Like