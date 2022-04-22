import { Router } from 'express'
import apiRoutes from './api'
import { nanoid } from 'nanoid'

const router = Router()
router.use(({ session }, {}, next) => {
  if(!session.safety_check) session.safety_check = nanoid(30)
  next()
})

router.use('/api/', apiRoutes)

router.get('*', (req, res) => {
  // TODO:  Make a 404 page.
  res.render('home')
})

export default router