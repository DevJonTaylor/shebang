import { sequelize, Model, INTEGER, STRING, ENUM } from '../lib/config'
import { genSalt, hash, compare } from 'bcrypt'

/**
 * @typedef {{
 *   firstName: string,
 *   lastName: string,
 *   username: string,
 *   email: string,
 *   password: string,
 *   role: 'Author' | 'Admin'
 * }} UserObject
 */
class User extends Model {

  /**
   * Generates a salt for the BCrypt has based on the number of rounds.
   * @param { number } rounds
   * @returns { Promise<salt> }
   */
  static generateSalt(rounds = 10) {
    return new Promise((resolve, reject) => {
      genSalt(rounds, (err, salt) => {
        if(err) return reject(err)
        return resolve(salt)
      })
    })
  }

  /**
   * Turns a password into a hash.
   * @param {string} password
   * @returns {Promise<string>}
   */
  static hash(password) {
    return this.generateSalt()
      .then(salt => new Promise((resolve, reject) =>
        hash(password, salt, (err, hash) => err
          ? reject(err) : resolve(hash)
        )
      )
    )
  }

  /**
   * Determines if the two strings are one of the same.
   * @param { string } password
   * @param { string } hash
   * @returns {Promise<boolean>}
   */
  static compare(password, hash) {
    return new Promise((resolve, reject) => {
      compare(password, hash, (err, isMatch) => !err ? resolve(isMatch) : reject(err))
    })
  }

  /**
   * Authenticates a user based on comparing their password provided with the username.
   * @param { string } username
   * @param { string } password
   * @returns { Promise<boolean|User> }
   */
  static async authenticate(username, password) {
    try {
      const user = await this.findOne({ where: { username }, attributes: [ 'id', 'password' ] })
      const isMatched = this.compare(password, user.password)

      if(!isMatched) return false
      return await this.findOne({
        where: { id },
        attributes: [ 'id', 'firstName', 'lastName', 'username', 'role' ]
      })
    } catch(err) {
      return Promise.reject(err)
    }
  }

  /**
   * Takes an array of Users and adds them to the database.
   * @param {Array<UserObject>} users
   * @param {BulkCreateOptions} options
   * @returns {Promise<Array<User>>}
   */
  static async bulkCreate(users, options) {
    for(const arg of users) {
      arg.password = await this.hash(arg.password)
    }
    return super.bulkCreate(users, options)
  }

  /**
   * Creates a single user in the Database.
   * @param {UserObject} user
   * @returns {Promise<User>}
   */
  static async create(user) {
    user.password = await this.hash(user.password)
    return super.create(user)
  }
}

User.init({
  id: {
    type: INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstName: {
    type: STRING(30),
    allowNull: false
  },
  lastName: {
    type: STRING(30),
    allowNull: false
  },
  username: {
    type: STRING(30),
    unique: true,
    allowNull: false
  },
  email: {
    type: STRING(60),
    unique: true,
    allowNull: false
  },
  password: {
    type: STRING(72),
    allowNull: false
  },
  role: {
    type: ENUM('Author', 'Admin'),
    allowNull: false
  }
}, {
  sequelize,
  freezeTableName: true,
  timestamps: true,
  underscored: true,
  tableName: 'users',
  modelName: 'User'
})

export default User