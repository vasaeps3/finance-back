import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { JwtStrategy } from '../../utils/jwt/jwt.strategy';
import { DatabaseModule } from '../../db/database.module';
import { JwtCustomService } from '../../utils/jwt/jwt-custom.service';
import { LocalStrategyController } from './local-strategy/local-strategy.controller';


@Module({
  imports: [
    DatabaseModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      privateKey: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }),
  ],
  controllers: [
    LocalStrategyController,
  ],
  providers: [
    AuthService,
    UserService,
    JwtStrategy,
    JwtCustomService,
  ],
})
export class AuthModule { }
