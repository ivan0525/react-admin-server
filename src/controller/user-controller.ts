import { Body, JsonController, Post, Get } from 'routing-controllers'
import { UserService } from '../service/user-service'
import { User } from '../entities'
import { genSalt, hashSync } from 'bcrypt'
@JsonController()
export class UserController {
  constructor(private userService: UserService) { }

  @Get('/test')
  test() {
    return {
      message: 'test'
    }
  }
  @Post('/register')
  async register(@Body() user: User): Promise<any> {
    const exitUser = await User.findOne({ username: user.username })
    if (exitUser) {
      return {
        message: '该用户名已被注册',
        result: {}
      }
    }
    // 加密
    const hash = hashSync(user.password, 10)
    user.password = hash
    const result = await this.userService.addUser(user)
    return {
      message: '操作成功',
      result
    }
  }
}
