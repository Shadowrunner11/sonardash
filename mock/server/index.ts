import jsonServer from 'json-server'
import { auth } from '../middlewares'

const router = jsonServer.router('./mock/db.json')

const server = jsonServer.create()

const rewrite = jsonServer.rewriter({
  '/issues/search': '/issues',
})

server
  .use(auth)
  .use(jsonServer.defaults())
  .use(rewrite)
  .use(router)
  .listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log('Mock server')
  })
