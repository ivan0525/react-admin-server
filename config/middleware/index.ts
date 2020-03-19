import { verify } from 'jsonwebtoken'
import { Context, Next } from 'koa'
export const checkToken = () => {
  return async (ctx: Context, next: Next) => {
    const check = (ctx: Context) => {
      const { url } = ctx.request
      if (url !== '/api/user/login' && url !== '/api/user/register') {
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
