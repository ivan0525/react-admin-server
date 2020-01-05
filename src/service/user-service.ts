import { getMongoRepository, MongoRepository } from 'typeorm'
import { User } from '../entities'

export class UserService {
  repository: MongoRepository<User>

  constructor() {
    this.repository = getMongoRepository(User)
  }

  // 创建用户
  async addUser(user: User): Promise<User> {
    console.log(user)
    return await user.save()
  }
}
