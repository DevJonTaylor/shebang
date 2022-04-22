/**
 * /api/users/*
 */
import { Router } from 'express'
import { searchUsers, userById, authenticate } from './methods'

const router = new Router()





router.route('')
  .get(async ({ query }, { ok, serverError }) => {
    try {
      const users = await searchUsers(query)

      return ok(users)
    } catch(err) {
      console.error(err)
      serverError(err)
    }

  })
// TODO: Create method   .post()

router.post('/login', async ({ session, body:{ username, password } }, { ok, badRequest, serverError }) => {
  try {
    if(session.loggedIn) {
      const user = await userById(session.userId)
      return ok(user)
    }

    if(!username || !password) return badRequest();

    const user = await authenticate(username, password)
    if(!user) return badRequest('Invalid Credentials.')

    session.loggedIn = true
    session.userId = user.id
    
    return ok(user)
  } catch(err) {
    
    console.error(err)
    serverError(err)
  }

})

/**
 * This post logs the user out.
 * @typedef {{
 *   ok: (data?: unknown) => void,
 *   badRequest: (reason?: string) => void,
 *   serverError: () => void
 * }} MiddlewareMethods for consistency.
 * @param {Session} session
 * @param {MiddlewareMethods} { ok, badRequest, serverError }
 */
router.post('/logout', async ({ session }, { ok, badRequest, serverError }) => {
  try {
    if(!session.loggedIn) return badRequest()

    delete session.loggedIn
    delete session.userId

    return ok()
  } catch(err) {
    logError(err)

  }
})
// router.route(':id')
//   .get()
//   .put()
//   .delete()

export default router