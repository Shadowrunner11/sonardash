import jsonServer from 'json-server'
import { RequestHandler } from 'express'
const server = jsonServer.create()

server.use()
export const auth: RequestHandler = function (req, res, err) {
  const {
    headers: { authorization = '' },
  } = req

  const regAuth = new RegExp(/Basic .+=/)

  if (!regAuth.test(authorization)) return res.status(401).send()

  err()
}
