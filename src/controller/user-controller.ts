import { Body, JsonController, Post } from 'routing-controllers'
import { UserService } from '../service/user-service'
import { User } from '../entities'
@JsonController()
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/register')
  async register(@Body() user: User): Promise<any> {
    console.log(this.userService)
    const data = await this.userService.addUser(user)
    return { data }
  }
}
