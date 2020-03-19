import * as Koa from 'koa'
import * as logger from 'koa-logger'
import * as bodyParser from 'koa-bodyparser'
import { checkToken } from './middleware'
export const useMiddlewares = <T extends Koa>(app: T): T => {
  app.use(logger())

  app.use(bodyParser())
  app.use(checkToken())

  return app
}
