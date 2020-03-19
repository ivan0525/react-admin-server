import { MinLength, IsNotEmpty } from 'class-validator'
import { Entity, CreateDateColumn, ObjectIdColumn, Column, BaseEntity } from 'typeorm'
import { ObjectID } from 'mongodb'

@Entity('user')
export class User extends BaseEntity {
  @ObjectIdColumn()
  _id: ObjectID

  @IsNotEmpty()
  @MinLength(4)
  @Column()
  username: string

  @Column()
  email: string

  @IsNotEmpty()
  @Column()
  password: string

  @CreateDateColumn()
  createDate: Date
}
