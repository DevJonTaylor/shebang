import { searchUsers } from '../methods'

/**
 * Gets all users or performs a search based on the query sent.
 * @param {{ firstName?: string, lastName?: string, username?: string }} query
 * @param { OkResponse } ok
 * @param { ServerErrorResponse } serverError
 * @returns { RouteReturn }
 */
export default async function({ query }, {ok, serverError}) {
  try {
    const users = await searchUsers(query)

    return ok(users)
  } catch(err) {
    console.error(err)
    serverError(err)
  }
}