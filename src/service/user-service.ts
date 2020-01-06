import { User } from '../entities'

export class UserService {
  // 创建用户
  async addUser(user: User): Promise<User> {
    return await user.save()
  }
}
