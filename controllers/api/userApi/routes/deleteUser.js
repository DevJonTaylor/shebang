import { deleteUserById, logUserOut } from '../methods'

/**
 * Deletes a user by the id from req.params
 * @param {SessionObject} session
 * @param {string} id
 * @param {OkResponse} ok
 * @param {NotFoundResponse} notFound
 * @param {NotAuthorizedResponse} notAuthorized
 * @param {ServerErrorResponse} serverError
 * @returns {RouteReturn}
 */
export default async function({ session, params: { id } }, { ok, notFound, notAuthorized, serverError }) {
  try {
    if(!session.loggedIn) return notAuthorized()
    if(!session.isAdmin && session.userId !== parseInt(id))
      return notAuthorized()

    const user = deleteUserById(id)

    if(session.userId === parseInt(id)) logUserOut(session)

    return !user ? notFound() : ok()
  } catch(err) {
    console.error(err)
    serverError()
  }
}