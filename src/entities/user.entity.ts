
import { MinLength, IsNotEmpty } from 'class-validator'
import { Entity, CreateDateColumn, ObjectID, ObjectIdColumn, Column, BaseEntity } from 'typeorm'
import { Transform } from 'class-transformer'

@Entity('user')
export class User extends BaseEntity {
  @ObjectIdColumn()
  id: ObjectID;

  @MinLength(4)
  @Column()
  username: string

  @IsNotEmpty()
  @Column()
  password: string

  @CreateDateColumn({ type: 'datetime' })
  createDate: Date
}
