import { User } from '../../../models'
import { Op } from 'sequelize'

const ATTRIBUTES = {
  include: [ 'id', 'username', 'fullName', 'firstName', 'lastName', 'email', 'role' ],
  exclude: [ 'password' ]
}

function createWhereLike(where, name, value) {
  where[name] = { [Op.like]: `%${value}%` }
}

function likeSearchQuery({ firstName, lastName, username }) {
  const where = {}
  if(firstName) createWhereLike(where, 'firstName', firstName)
  if(lastName) createWhereLike(where, 'lastName', lastName)
  if(username) createWhereLike(where, 'username', username)
  return where
}

export function logUserIn(session, user) {
  session.loggedIn = true
  session.userId = user.id
  session.isAdmin = user.role === 'Admin'
}

export function logUserOut(session) {
  delete session.loggedIn
  delete session.userId
  delete session.isAdmin
}

export function userById(id) {
  return User.findOne({ where: { id }, attributes: ATTRIBUTES })
}

export function searchUsers(query) {
  return User.findAll({
    where: { ...likeSearchQuery(query) },
    attributes: ATTRIBUTES
  })
}

export function authenticate(username, password) {
  return User.authenticate(username, password)
}

export function createUser(userObject) {
  return User.create(userObject, { attributes: ATTRIBUTES })
}

export async function updateUserById(id, userObject) {
  try {
    if(userObject.password) {
      userObject.password = await User.hash(userObject.password)
    }
    const user = await User.update(userObject, { individualHooks: true, where: { id } })
    return !user[1].length ? false : user[1]
  } catch(err) {
    return Promise.reject(err)
  }
}

export function deleteUserById(id) {
  return User.destroy({where: {id}})
}