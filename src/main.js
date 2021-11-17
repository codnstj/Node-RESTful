/* eslint-disable no-undef */
// @ts-check

// 프레임워크 없이 간단한 토이 프로젝트 웹 서버 만들어보기

/**
 * 블로그 포스팅 서비스
 *  - 로컬 파일을 데이터베이스로 활용할 예정 (JSON)
 *  - 인증 로직은 넣지 않습니다.
 *  - RESTful API 를 사용합니다.
 */

const http = require('http')

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
// eslint-disable-next-line no-unused-vars

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
const server = http.createServer((req, res) => {
  const POSTS_ID_REGEX = /^\/posts\/([a-zA-z0-9-_]+)$/
  const PostIdRegexResult =
    (req.url && POSTS_ID_REGEX.exec(req.url)) || undefined
  if (req.url === '/posts' && req.method === 'GET') {
    const result = {
      posts: posts.map((post) => ({
        id: post.id,
        title: post.title,
      })),
      tottalCount: posts.length,
    }
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json; charset=utf-8')
    res.end(JSON.stringify(result))
  } else if (PostIdRegexResult) {
    // GET /posts/:id
    const postId = PostIdRegexResult[1]

    const post = posts.find((_post) => _post.id === postId)
    if (post) {
      res.statusCode = 200
      res.end(JSON.stringify(post))
    } else {
      res.statusCode = 404
      res.end('Post NotFOund')
    }
    console.log(`postId : ${postId}`)
  } else if (req.url === '/posts' && req.method === 'POST') {
    res.statusCode = 200
    res.end('Creating post')
  } else {
    res.statusCode = 404
    res.end('Not found.')
  }
})

const PORT = 4000

server.listen(PORT, () => {
  console.log(`the server is listen on ${PORT}`)
})
