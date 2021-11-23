// @ts-check

/**
 * jsdoc : 함수가 어떤 파라미터를 받고 어떤걸 접근 하는지 주석으로 나타내는 것
 */

/**
 * @typedef Post
 * @property {string} id
 * @property {string} title
 * @property {string} content
 */
/** @type {Post[]} */

const posts = [
  {
    id: 'my_first_post',
    title: 'My first post',
    content: 'hello!',
  },
  {
    id: 'my_second_post',
    title: '나의 두번째 게시물',
    content: 'Second Post',
  },
]

/**
 * Post
 *
 * GET /posts
 * GET /posts/:id
 * POST /posts
 */

/**
 * @typedef APIResponse
 * @property {number} statusCode
 * @property {string | Object} body
 */

/**
 * @typedef Route
 * @property {RegExp} url
 * @property {'GET'|'POST'} method
 * @property {() => Promise<APIResponse>} callback
 */

/** @type {Route[]} */
const routes = [
  {
    // GET /posts
    url: /^\/posts$/,
    method: 'GET',
    callback: async () => ({
      // TODO : implement
      statusCode: 200,
      body: posts,
    }),
  },
  {
    // GET /posts/:id
    url: /^\/posts\/([a-zA-z0-9-_]+)$/,
    method: 'GET',
    // @ts-ignore
    callback: async (matches) => {
      const postId = matches[1]
      if (!postId) {
        return {
          statusCode: 404,
          body: 'Not found',
        }
      }
      const post = posts.find((_post) => _post.id === postId)

      if (!post) {
        return {
          statusCode: 404,
          body: 'Not found',
        }
      }
      return {
        statusCode: 200,
        body: post,
      }
    },
  },
  {
    // POST /posts
    url: /^\/posts$/,
    method: 'POST',
    callback: async () => ({
      // TODO : implement
      statusCode: 200,
      body: {},
    }),
  },
]

module.exports = {
  routes,
}
