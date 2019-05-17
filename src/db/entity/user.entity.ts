import { Entity, Column, OneToMany } from 'typeorm';
import { IsString, IsEmail } from 'class-validator';

import { EntityBase } from './base.entity';
import { Category } from './category.entity';


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

  @OneToMany(type => Category, category => category.user)
  categories: Category[];
}
