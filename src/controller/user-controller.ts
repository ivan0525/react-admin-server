import { Body, JsonController, Post, Get, Header, Ctx, Param, Put } from 'routing-controllers'
import { ObjectID } from 'mongodb'
import { getMongoRepository } from 'typeorm'
import { UserService } from '../service/user-service'
import { User } from '../entities'
import { hashSync } from 'bcrypt'
import { Context } from 'koa'

/**
 * e.g. api => http://localhost:3600/api/user/*
 */
@JsonController('/user')
export class UserController {
  constructor(private userService: UserService) { }

  @Header('access-control-allow-headers', 'X-Requested-With,Content-Type')
  @Header('access-Control-Allow-Origin', '*')
  @Get('/test')
  public test(@Ctx() ctx: Context) {
    ctx.request.accepts('application/json')
    console.log(ctx.request.accept)
    return {
      message: 'test'
    }
  }

  /**
   * Register interface
   * @param user {User} - user's info
   */
  @Post('/register')
  public async register(@Body() user: User): Promise<any> {
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

  @Post('/login')
  async login(@Body() form: IloginForm) {
    const userRepository = getMongoRepository(User)
    // const matchedUser = await
  }

  /**
   * Get user info by id
   * @param id {string} - user id
   */
  @Get('/getUserInfoById/:id')
  public async getUserInfoById(@Param('id') id: string) {
    const objectId = new ObjectID(id)
    const userRepository = getMongoRepository(User)
    return userRepository.findOne({ _id: objectId })
  }
}

/**
 * Update user info by id
 * @param user {User} - user info object
 */
// @Put('/updateUserInfoById/:id')
// public async updateUserInfoById()

export interface IloginForm {
  username: string
  password: string
}
