import { KoaMiddlewareInterface, Middleware } from 'routing-controllers'
import { Context, Next } from 'koa'
import { verify } from 'jsonwebtoken'

@Middleware({ type: 'before' })
export class HeaderMiddleware implements KoaMiddlewareInterface {
  async use(context: any, next: (err?: any) => any): Promise<any> {
    context.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,POST,DELETE,PATCH')
    context.set(
      'Access-Control-Allow-Origin',
      context.request.header.origin || context.request.origin
    )
    context.set('Access-Control-Allow-Headers', ['content-type'])
    context.set('Access-Control-Allow-Credentials', 'true')
    context.set('Content-Type', 'application/json; charset=utf-8')
    return next()
  }
}

@Middleware({ type: 'before' })
export class CheckTokenMiddleware implements KoaMiddlewareInterface {
  async use(ctx: Context, next: Next): Promise<any> {
    const check = (ctx: Context) => {
      const { url } = ctx.request
      if (url !== '/api/user/login' && url !== '/api/user/test' && url !== '/api/user/register') {
        // 获取请求头中的token
        const token = ctx.request.header['x-token']
        // 进行token认证
        try {
          const decoded = verify(token, 'secret')
          console.log(decoded)
        } catch (err) {
          ctx.throw(401, err)
        }
      }
    }
    check(ctx)
    await next()
  }
}
