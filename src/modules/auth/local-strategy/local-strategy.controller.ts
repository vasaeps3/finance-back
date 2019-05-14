import { Controller, Post, Res, Body, HttpStatus, BadRequestException, ValidationPipe, UsePipes, UnauthorizedException } from '@nestjs/common';
import { Response } from 'express';

import { User } from 'src/db/entity/user.entity';
import { AuthService } from '../auth.service';
import { createMessage } from 'src/utils/createMessage';


@Controller('auth')
export class LocalStrategyController {

  constructor(
    private readonly authService: AuthService,
  ) { }

  @Post('signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  async signUp(@Res() res: Response, @Body() user: User) {
    const existingUser = await this.authService.getUserByEmail(user.email);
    if (!!existingUser) {
      throw new BadRequestException([createMessage('email', ['User already exists'])]);
    }

    const createdUser: User = await this.authService.add(user);

    res.status(HttpStatus.CREATED).json(createdUser);
  }

  @Post('signin')
  @UsePipes(new ValidationPipe({ transform: true, skipMissingProperties: true }))
  async signIn(@Res() res: Response, @Body() user: User) {
    const existingUser = await this.authService.getUserByEmail(user.email || null);

    if (!existingUser || existingUser.password !== this.authService.encryptPassword(user.password || '')) {
      throw new UnauthorizedException('The email or password is incorrect');
    }

    res.status(HttpStatus.OK).json();
  }

}
