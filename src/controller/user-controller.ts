import { Body, JsonController, Post, Get, Header, Ctx, Param, Put, Delete } from 'routing-controllers'
import { ObjectID } from 'mongodb'
import { getMongoRepository } from 'typeorm'
import { UserService } from '../service/user-service'
import { User } from '../entities'
import { Context } from 'koa'

/**
 * e.g. api => http://localhost:3600/api/user/*
 */
@JsonController('/user')
export class UserController {
  constructor(private userService: UserService) { }

  @Get('/test')
  public test(@Ctx() ctx: Context) {
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
  public register(@Body() user: User) {
    return this.userService.addUser(user)
  }

  @Post('/login')
  public login(@Body() form: IloginForm) {
    // const userRepository = getMongoRepository(User)
    // const matchedUser = await
    return this.userService.doLogin(form)
  }

  /**
   * Get user info by id
   * @param id {string} - user id
   */
  @Get('/getUserInfoById/:id')
  public getUserInfoById(@Param('id') id: string) {
    return this.userService.getUser(id)
  }

  /**
   * Update user info by id
   * @param user {User} - user info object
   */
  @Put('/updateUserInfoById/:id')
  public async updateUserInfoById(@Param('id') id: string, @Body() user: User) {
    const objectId = new ObjectID(id)
    const userRepository = getMongoRepository(User)
    return userRepository.findOneAndUpdate({ _id: objectId }, user)
  }

  /**
   * Delete user by id
   * @param id {string} - user id
   */
  @Delete('/deleteUserById/:id')
  public async deleteUserById(@Param('id') id: string) {
    return this.userService.deleteUser(id)
  }
}

export interface IloginForm {
  username: string
  password: string
}
