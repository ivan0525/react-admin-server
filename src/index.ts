import 'reflect-metadata'
import { Server } from 'http'
import * as Koa from 'koa'
import { Container } from 'typedi'
import { routingConfigs } from '../config/routing.options'
import { useMiddlewares } from '../config/koa.middlewares'
import { useKoaServer, useContainer } from 'routing-controllers'
import { print } from '../utils/index'

require('./../config/connection')

async function createServer(): Promise<Koa> {
  const koa = new Koa()
  useMiddlewares(koa)

  const app: Koa = useKoaServer<Koa>(koa, routingConfigs)
  useContainer(Container)
  return app
}

module.exports = (async (): Promise<Server> => {
  try {
    const app = await createServer()
    return app.listen(3600, () => {
      print.log('Server listening on 3600, in dev mode')
    })
  } catch (err) {
    console.log(err)
  }
})()
