import { Entity, Column, OneToOne, JoinColumn, ManyToOne, Unique } from 'typeorm';
import { IsString, IsEnum } from 'class-validator';

import { User } from './user.entity';
import { EntityBase } from './base.entity';
import { CategoryType } from '../../utils/enums/type-category.enum';


@Entity()
@Unique(['name', 'type', 'user'])
export class Category extends EntityBase {
  @IsString()
  @Column()
  public name: string;

  @IsEnum(CategoryType)
  @Column({
    type: 'enum',
    enum: CategoryType,
  })
  public type: CategoryType;

  @ManyToOne(type => User, user => user.categories)
  user: User;

}
