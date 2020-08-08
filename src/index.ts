import 'reflect-metadata'
import * as Koa from 'koa'
import { Container } from 'typedi'
import { useKoaServer, useContainer } from 'routing-controllers'
import * as logger from 'koa-logger'
import * as bodyParser from 'koa-bodyparser'
import * as controllers from '../src/controller'
import * as middleware from './middleware'
import { dictToArray } from '../utils'

// 必须在服务启动前使用
useContainer(Container)
require('./../config/connection')
const app = new Koa()

// 使用中间件
app.use(logger())
app.use(bodyParser())

useKoaServer(app, {
  controllers: dictToArray(controllers),
  middlewares: dictToArray(middleware),
  // router prefix
  // e.g. api => http://hostname:port/{routePrefix}/{controller.method}
  routePrefix: '/api',

  // auto validate entity item
  // learn more: https://github.com/typestack/class-validator
  validation: true
})

app.listen(3600, () => {
  console.info('Listening on port 3600')
})
