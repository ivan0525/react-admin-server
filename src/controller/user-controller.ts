import {
  Body,
  JsonController,
  Post,
  Get,
  QueryParams,
  Ctx,
  Param,
  Put,
  Delete
} from 'routing-controllers'
import { UserService } from '../service/user-service'
import { User } from '../entities'
import { Context } from 'koa'

/**
 * e.g. api => http://localhost:3600/api/user/*
 */
@JsonController('/user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/test')
  public test(@Ctx() ctx: Context) {
    return {
      message: 'test',
      status: 'C0000'
    }
  }

  @Get('/list')
  public list(@QueryParams() params: IqueryParams) {
    return this.userService.getList(params)
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
    return this.userService.updateUser(id, user)
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
  email: string
  password: string
}

export interface IqueryParams {
  username?: string
  createDate?: string
  pageSize?: number
  pageCount?: number
  currentPage?: number
}
