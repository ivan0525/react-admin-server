import * as Koa from 'koa'
import * as logger from 'koa-logger'
import * as bodyParser from 'koa-bodyparser'

export const useMiddlewares = <T extends Koa>(app: T): T => {
  app.use(logger())

  app.use(bodyParser())

  return app
}
