import { userById } from '../methods'

/**
 * Gets a user by their id
 * @param {number} id
 * @param {OkResponse} ok
 * @param {NotFoundResponse} notFound
 * @param {ServerErrorResponse} serverError
 * @returns {RouteReturn}
 */
export default async function({ params: { id } }, { ok, notFound, serverError }) {
  try {
    const user = await userById(id)

    return !user ? notFound() : ok(user)
  } catch(err) {
    console.error(err)
    return serverError()
  }
}