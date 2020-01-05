import { RoutingControllersOptions } from 'routing-controllers'
import * as controllers from '../src/controller'
import { dictToArray } from './utils'
export const routingConfigs: RoutingControllersOptions = {
  controllers: dictToArray(controllers),

  // router prefix
  // e.g. api => http://hostname:port/{routePrefix}/{controller.method}
  routePrefix: '/api',

  // auto validate entity item
  // learn more: https://github.com/typestack/class-validator
  validation: true
}
