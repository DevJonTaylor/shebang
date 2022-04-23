import { Router } from 'express'
import { getPosts } from './methods'

const router = new Router()

router.get('', async ({query:{ page, limit }}, { ok, serverError }) => {
  try {
    if(!page) page = 1
    if(!limit) limit = 5
    const posts = await getPosts(!limit ? 5 : parseInt(limit), !page ? 1 : parseInt(page))

    ok(posts)
  } catch(err) {
    console.error(err)
    serverError()
  }
})

export default router