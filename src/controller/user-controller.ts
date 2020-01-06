import { Body, JsonController, Post, Get, QueryParam } from 'routing-controllers'
import { ObjectID } from 'mongodb'
import { getMongoRepository, getRepository } from 'typeorm'
import { UserService } from '../service/user-service'
import { User } from '../entities'
import { hashSync } from 'bcrypt'
@JsonController()
export class UserController {
  constructor(private userService: UserService) { }

  @Get('/test')
  test() {
    return {
      message: 'test'
    }
  }

  /**
   * Register interface
   * @param user {User} - user's info
   */
  @Post('/register')
  async register(@Body() user: User): Promise<any> {
    try {
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
        message: '处理成功',
        result
      }
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * Get user info by id
   * @param id {string} - user id
   */
  @Get('/getUserInfoById')
  async getUserInfoById(@QueryParam('id') id: string): Promise<any> {
    const objectId = new ObjectID(id)
    console.log(objectId)
    const userRepository = getMongoRepository(User)
    const matchedUser = await userRepository.findOne({ _id: objectId } as any)
    console.log(matchedUser)
    return {
      message: '处理成功',
      result: matchedUser || null
    }
  }
}
