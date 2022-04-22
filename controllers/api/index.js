import { Router } from 'express'
import usersRoutes from './userApi'

const router = new Router()

// Only to be used for testing.
router.get('/ping', ({ session }, res) => {
  return res.json({ status: 200, message: 'Ok', data: session.safety_check })
})

/**
 * @typedef {(data?: unknown) => void} OkResponse
 * @typedef {() => void} NotFoundResponse
 * @typedef {(reason?: string) => void} BadRequestResponse
 * @typedef {() => void} NotAuthorizedResponse
 * @typedef {() => void} ServerErrorResponse
 * @typedef {Promise<void>} RouteReturn
 */
router.use((req, res, next) => {
  res.reply = (status, message, jsonData) => res.status(status).json({ status, message, ...!jsonData ? {} : jsonData })

  res.ok = data => res.reply(200, 'Ok', !data ? undefined : { data })

  res.notAuthorized = () => res.reply(401, 'Not Authorized')

  res.notFound = () => res.reply(404, 'Not Found')

  res.badRequest = reason => res.reply(400, 'Bad Request', !reason ? undefined : { reason })

  res.serverError = () => res.reply(500, 'Internal Server Error')

  if(req.headers.safety_check !== req.session.safety_check)
    return res.badRequest('Bad Session ID')

  next();
})

router.use('/users', usersRoutes)

export default router