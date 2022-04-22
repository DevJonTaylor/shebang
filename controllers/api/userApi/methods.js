import { User } from '../../../models'
import { Op } from 'sequelize'

const ATTRIBUTES = {
  include: [ 'id', 'username', 'fullName', 'firstName', 'lastName', 'email', 'role' ]
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