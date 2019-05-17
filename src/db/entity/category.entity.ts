import { Entity, Column, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import { IsString } from 'class-validator';

import { User } from './user.entity';
import { EntityBase } from './base.entity';
import { CategoryType } from '../../utils/enums/type-category.enum';


@Entity()
export class Category extends EntityBase {
  @IsString()
  @Column({
    unique: true,
  })
  public name: string;

  @Column({
    type: 'enum',
    enum: CategoryType,
  })
  public type: CategoryType;

  @ManyToOne(type => User, user => user.categories)
  user: User;

}
