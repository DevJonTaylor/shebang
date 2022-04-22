import { createUser, logUserIn } from '../methods'

/**
 * @typedef {{
 *   loggedIn?: boolean,
 *   userId?: number,
 *   isAdmin?: boolean
 * }} SessionObject
 * @param {UserObject} body
 * @param {SessionObject} session
 * @param {OkResponse} ok
 * @param {BadRequestResponse} badRequest
 * @param {ServerErrorResponse} serverError
 * @returns {RouteReturn}
 */
export default async function({ body, session }, { ok, badRequest, serverError }) {
  try {
    if(session.loggedIn) {
      if(!session.isAdmin) return badRequest('Account logged in.')
    } else body.role = 'Author'
    const user = await createUser(body)
    if(!session.loggedIn)
      logUserIn(session, user)

    return ok(user)
  } catch(err) {
    if(err.errors) {
      switch(err.errors[0].message) {
        case 'username must be unique':
          return badRequest('Username must be unique.')
        case 'email must be unique':
          return badRequest('Email must be unique.')
        default:
          console.error(err)
          return serverError(err)
      }
    }
    console.error(err)
    serverError(err)
  }
}