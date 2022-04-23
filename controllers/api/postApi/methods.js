import { Post, Comment, Like } from '../../../models'

const USER_ATTRIBUTES = ['id', 'username']
const AUTHOR_INCLUDE = { association: Post.author, attributes: USER_ATTRIBUTES }
const RESPONDER_INCLUDE = { association: Comment.responder, attributes: USER_ATTRIBUTES }
const INCLUDES = [
  AUTHOR_INCLUDE,
  { model: Comment, attributes: ['id', 'UserId', 'comment', 'updatedAt'], include: RESPONDER_INCLUDE },
  { model: Like }
]

function getPostIdLikes(postId) {
  return Like.count({where: { PostId: postId }})
}

async function userHasLikedPostId(UserId, PostId) {
  const like = await Like.findOne({ where: { UserId, PostId } })
  return !like === false
}

export async function getPosts(limit = 5, page = 1) {
  try {
    const posts = await Post.findAndCountAll({
      where: { published: true },
      distinct: 'id',
      limit,
      offset: (page === 1 ? 0 : limit * page),

      include: INCLUDES
    })

    let totalPages = Math.floor(posts.count / limit)
    totalPages = totalPages * limit >= posts.count ? totalPages - 1 : totalPages

    return {
      pages: {
        current: parseInt(page),
        ...(page === totalPages) ? {} : { last: totalPages, next: page + 1 },
        ...(page === 1) ? {} : { first: 1, prev: page - 1 },
        total: posts.count
      },
      results: posts.rows
    }
  } catch(err) {
    return Promise.reject(err)
  }
}

export async function getPostById(id, userIdLoggedIn) {
  try {
    const post = await Post.findOne({
      where: { id },
      include: INCLUDES
    })

    if(!post) return false
    if(!userIdLoggedIn) return post
    return { post, hasUserLiked: await userHasLikedPostId(userIdLoggedIn, id) }
  } catch(err) {
    Promise.reject(err)
  }
}