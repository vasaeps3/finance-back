import { Entity, Column } from 'typeorm';
import { IsString, IsEmail } from 'class-validator';

import { EntityBase } from 'src/db/entity/base.entity';


@Entity()
export class User extends EntityBase {

  @IsString()
  @IsEmail()
  @Column({
    unique: true,
  })
  public email: string;

  @IsString()
  @Column()
  public password: string;
}
