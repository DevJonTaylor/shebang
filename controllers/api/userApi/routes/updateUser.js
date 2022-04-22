import { updateUserById } from '../methods'

/**
 * Updates a user based on the id in the parameters and the body passed.
 * @param {number} id
 * @param {UserObject} body
 * @param {OkResponse} ok
 * @param {NotFoundResponse} notFound
 * @param {ServerErrorResponse} serverError
 * @returns {RouteReturn}
 */
export default async function({ params: { id }, body }, { ok, notFound, serverError }) {
  try {
    const user = await updateUserById(id, body)

    return !user ? notFound() : ok(user)
  } catch(err) {
    console.error(err)
    return serverError()
  }
}