import {
  Controller,
  Post,
  Res,
  Body,
  HttpStatus,
  BadRequestException,
  ValidationPipe,
  UsePipes,
  UnauthorizedException,
  UseGuards,
  Get,
} from '@nestjs/common';
import { Response } from 'express';
import * as _ from 'lodash';

import { User } from '../../../db/entity/user.entity';
import { UserService } from '../user.service';
import { createMessage } from '../../../utils/createMessage';
import { JwtAuthGuard } from '../../../utils/jwt/jwt-auth.guard';
import { JwtCustomService } from '../../../utils/jwt/jwt-custom.service';



@Controller('auth')
export class LocalStrategyController {

  constructor(
    private readonly userService: UserService,
    private readonly jwtCustomService: JwtCustomService,
  ) { }

  @Post('signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  async signUp(@Res() res: Response, @Body() user: User) {
    const existingUser = await this.userService.getUserByEmail(user.email);
    if (!!existingUser) {
      throw new BadRequestException([createMessage('email', ['User already exists'])]);
    }
    const createdUser: User = await this.userService.add(user);

    res.status(HttpStatus.CREATED).json(createdUser);
  }

  @Post('signin')
  @UsePipes(new ValidationPipe({ transform: true, skipMissingProperties: true }))
  async signIn(@Res() res: Response, @Body() user: User) {
    const existingUser = await this.userService.getUserByEmail(user.email || null);

    if (!existingUser || existingUser.password !== this.userService.encryptPassword(user.password || '')) {
      throw new UnauthorizedException('The email or password is incorrect');
    }

    const accesToken = this.jwtCustomService.generateUserToken(_.pick(existingUser, ['id']));

    res.set('Authorization', accesToken);
    res.status(HttpStatus.OK).json();
  }

  @Get('test')
  @UseGuards(JwtAuthGuard)
  async test(@Res() res: Response) {

    res.status(HttpStatus.OK).json();
  }

}
