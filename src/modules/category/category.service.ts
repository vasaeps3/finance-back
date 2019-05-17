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

  public async getCategoriesByUser(userId: User['id'], type: CategoryType = null): Promise<Category[]> {
    console.log(type);
    return this.repository.find(
      {
        // relations: ['user'],
        where: {
          user: userId || 0,
          type,
        },
      },
    );
  }
}
