import { sequelize, STRING, INTEGER, Model } from '../lib/config'

class Comment extends Model {}

Comment.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  comment: {
    type: STRING(125),
    allowNull: false
  },
  UserId: {
    type: INTEGER,
    reference: {
      model: 'User',
      table: 'users',
      foreignKey: true,
      name: 'UserId'
    }
  },
  PostId: {
    type: INTEGER,
    reference: {
      model: 'User',
      table: 'users',
      foreignKey: true,
      name: 'PostId'
    }
  }
},{
  sequelize,
  freezeTableName: true,
  timestamps: true,
  underscored: true,
  tableName: 'comments',
  modelName: 'Comment'
})

export default Comment
