import { Controller, Get, Res, HttpStatus, UseGuards, Req, Param, Query } from '@nestjs/common';
import { Response, Request } from 'express';

import { User } from '../../db/entity/user.entity';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from '../../utils/jwt/jwt-auth.guard';
import { CategoryType } from '../../utils/enums/type-category.enum';

type AuthRequest = Request & { user: User };

@UseGuards(JwtAuthGuard)
@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
  ) { }

  // @Get()
  // async getCategories(@Req() { user }: AuthRequest, @Res() res: Response) {
  //   const categories = await this.categoryService.getCategoriesByUser(user && user.id);

  //   res.status(HttpStatus.OK).json(categories);
  // }

  @Get()
  async getCategoriesByType(@Req() { user }: AuthRequest, @Res() res: Response, @Query('type') type: CategoryType) {

    console.log(type);

    const categories = await this.categoryService.getCategoriesByUser(user && user.id, type);
    res.status(HttpStatus.OK).json(categories);
  }
}

// CategoryTypeValidationPipe