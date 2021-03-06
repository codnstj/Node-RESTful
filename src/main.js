/* eslint-disable no-unused-vars */
// @ts-check

// 프레임워크 없이 간단한 토이 프로젝트 웹 서버 만들어보기

/**
 * 블로그 포스팅 서비스
 *  - 로컬 파일을 데이터베이스로 활용할 예정 (JSON)
 *  - 인증 로직은 넣지 않습니다.
 *  - RESTful API 를 사용합니다.
 */

const http = require('http')
const { resolve } = require('path/posix')
const { routes } = require('./api')

const server = http.createServer((req, res) => {
  async function main() {
    // @ts-ignore
    const route = routes.find(
      (_route) =>
        req.url &&
        req.method &&
        _route.url.test(req.url) &&
        _route.method === req.method
    )

    if (!route || !req.url) {
      res.statusCode = 404
      res.end('Not Found!')
      return
    }
    const regexResult = route.url.exec(req.url)
    if (!regexResult) {
      res.statusCode = 404
      res.end('Not Found')
      return
    }

    // eslint-disable-next-line no-shadow
    const body = await new Promise((resolve) => {
      req.setEncoding('utf-8')
      req.on('data', (data) => {
        resolve(data)
      })
    })

    // @ts-ignore
    const result = await route.callback(regexResult)
    res.statusCode = result.statusCode

    if (typeof result.body === 'string') {
      res.end(result.body) //
    } else {
      res.setHeader('Content-Type', 'application/json; charset=utf-8') // 반환 될때 헤더값 ( Json 형태의 UTF-8 의 인코더 형식)
      res.end(JSON.stringify(result.body)) // 반환
    }
  }
  main()
})
const PORT = 4000

server.listen(PORT, () => {
  console.log(`the server i s listen on ${PORT}`)
})
