import { Entity, CreateDateColumn, ObjectIdColumn, Column, BaseEntity } from 'typeorm'

@Entity('user')
export class User extends BaseEntity {
  @ObjectIdColumn()
  id: string

  @Column()
  username: string

  @Column()
  password: string

  @CreateDateColumn()
  createDate: Date
}
