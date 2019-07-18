import { Controller, Get, Res, HttpStatus, UseGuards, Req, Query, Body, Post, UsePipes, ValidationPipe, ConflictException, BadRequestException } from '@nestjs/common';
import { Response, Request } from 'express';

import { User } from '../../db/entity/user.entity';
import { CategoryService } from './category.service';
import { JwtAuthGuard } from '../../utils/jwt/jwt-auth.guard';
import { CategoryType } from '../../utils/enums/type-category.enum';
import { Category } from '../../db/entity/category.entity';
import { createMessage } from '../../utils/createMessage';

type AuthRequest = Request & { user: User };

@UseGuards(JwtAuthGuard)
@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
  ) { }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true, skipMissingProperties: true }))
  async addCategory(@Req() { user }: AuthRequest, @Res() res: Response, @Body() category: Category) {

    const existingCategory = await this.categoryService.getCategoryByName(user && user.id, category);

    if (existingCategory) {
      throw new BadRequestException([createMessage('name', ['Category with the same name already exists'])]);
    }

    const newCategory = await this.categoryService.add(user, category);
    res.status(HttpStatus.OK).json(newCategory);
  }

  @Get()
  async getCategoriesByType(@Req() { user }: AuthRequest, @Res() res: Response, @Query('type') type: CategoryType) {

    const categories = await this.categoryService.getCategoriesByUser(user && user.id);
    res.status(HttpStatus.OK).json(categories || []);
  }
}
