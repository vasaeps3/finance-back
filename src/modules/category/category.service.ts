import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';


import { User } from '../../db/entity/user.entity';
import { Category } from '../../db/entity/category.entity';
import { CategoryType } from '../../utils/enums/type-category.enum';


@Injectable()
export class CategoryService {
  constructor(
    private connection: Connection,
  ) { }

  private get repository(): Repository<Category> {
    return this.connection.getRepository(Category);
  }

  public async add(user: User, category: Category): Promise<Category> {
    return this.repository.save({ ...category, user });
  }

  public async getCategoryByName(userId: User['id'], category: Category) {
    return await this.repository.findOne({
      where: {
        user: userId,
        type: category.type,
        name: category.name,
      },
    });
  }

  public async getCategoriesByUser(userId: User['id']): Promise<Category[]> {
    // console.log(type);
    return this.repository.find(
      {
        // relations: ['user'],
        where: {
          user: userId || 0,
          // type,
        },
      },
    );
  }
}
