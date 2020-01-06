
import { MinLength, IsNotEmpty } from 'class-validator'
import { Entity, CreateDateColumn, ObjectIdColumn, Column, BaseEntity } from 'typeorm'

@Entity('user')
export class User extends BaseEntity {
  @ObjectIdColumn()
  id!: string;

  @ObjectIdColumn({ name: 'id' })
  _id!: string;

  @MinLength(4)
  @Column()
  username: string

  @IsNotEmpty()
  @Column()
  password: string

  @CreateDateColumn({ type: 'datetime' })
  createDate: Date
}
