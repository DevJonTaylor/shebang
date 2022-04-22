/**
 * /api/users/*
 */
import { Router } from 'express'
import {
  getAllUsers,
  createNewUser,
  userLogin,
  userLogOut,
  getUserById,
  updateUser,
  deleteUser
} from './routes'

const router = new Router()


router.route('')
  .get(getAllUsers)
  .post(createNewUser)


router
  .post('/login', userLogin)
  .get('/logout', userLogOut)
  .route('/user/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser)

export default router