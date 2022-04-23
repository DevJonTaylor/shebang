import { Model, DataTypes } from 'sequelize'
import { sequelize } from '../lib/config'

const { INTEGER, STRING, BOOLEAN, TEXT } = DataTypes

class Post extends Model {}

Post.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  UserId: {
    type: INTEGER,
    reference: {
      table: 'users',
      model: 'User',
      foreignKey: true,
      key: 'id'
    }
  },
  title: {
    type: STRING,
    allowNull: false
  },
  slug: {
    type: STRING(120),
    allowNull: false,
  },
  views: {
    type: INTEGER,
    validate: true,
    defaultValue: 0
  },
  image: {
    type: STRING(60),
    allowNull: false
  },
  body: {
    type: TEXT,
    allowNull: false
  },
  published: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  sequelize,
  freezeTableName: true,
  timestamps: true,
  underscored: true,
  tableName: 'posts',
  modelName: 'Post'
})

export default Post