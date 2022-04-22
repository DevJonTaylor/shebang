import { authenticate, userById, logUserIn } from '../methods'

/**
 * Authenticates the user and then logs them in if successful.
 * @param {SessionObject} session
 * @param {string} username
 * @param {string} password
 * @param {OkResponse} ok
 * @param {BadRequestResponse} badRequest
 * @param {ServerErrorResponse} serverError
 * @returns {RouteReturn}
 */
export default async function ({ session, body:{ username, password } }, { ok, badRequest, serverError }) {
  try {
    if(session.loggedIn) {
      const user = await userById(session.userId)
      return ok(user)
    }

    if(!username || !password) return badRequest();

    const user = await authenticate(username, password)
    if(!user) return badRequest('Invalid Credentials.')

    logUserIn(session, user)

    return ok(user)
  } catch(err) {

    console.error(err)
    serverError(err)
  }

}