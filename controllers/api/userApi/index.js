/**
 * /api/users/*
 */
import { Router } from 'express'
import { searchUsers, userById } from './methods'
import { User } from '../../../models'
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
//   .post()

router.post('/login', async ({ session, body:{ username, password } }, { ok, badRequest, serverError }) => {
  try {
    if(session.loggedIn) {
      const user = await userById(session.userId)
      ok(user)
    }
    if(!username || !password) return badRequest();
    User.authenticate(username, password)
      .then(user => {
        if(!user)
          return badRequest('Invalid Credentials.')


        return ok(user)
      }).catch(err => {
      console.error(err)
      serverError(err)
    })
  } catch(err) {
    console.error(err)
    serverError(err)
  }

})
// router.route(':id')
//   .get()
//   .put()
//   .delete()

export default router