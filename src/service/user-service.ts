import { User } from '../entities'
import { ObjectID } from 'mongodb'
import { getMongoRepository } from 'typeorm'
import { hashSync } from 'bcrypt'

export interface Iresult {
  message: string
  result: any
}
export class UserService {
  // 创建用户
  async addUser(user: User): Promise<Iresult> {
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
      const result = await user.save()
      return {
        message: '处理成功',
        result
      }
    } catch (err) {
      console.log(err)
    }
  }

  /**
   * find user
   * @param id {string} - user id
   */
  async getUser(id: string): Promise<Iresult> {
    const objectId = new ObjectID(id)
    const userRepository = getMongoRepository(User)
    const result = await userRepository.findOne({ _id: objectId })
    return {
      message: '处理成功',
      result
    }
  }
}
