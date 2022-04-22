import { logUserOut } from '../methods'

/**
 * Logs the user out and manages the session.
 * @param {SessionObject} session
 * @param {OkResponse} ok
 * @param {BadRequestResponse} badRequest
 * @param {ServerErrorResponse} serverError
 * @returns {RouteReturn}
 */
export default function({ session }, { ok, badRequest, serverError }) {
  try {
    if(!session.loggedIn) return badRequest()

    logUserOut(session)

    return ok()
  } catch(err) {

    console.error(err)
    serverError(err)
  }
}