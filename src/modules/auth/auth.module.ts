import { Module } from '@nestjs/common';

import { DatabaseModule } from 'src/db/database.module';
import { AuthService } from './auth.service';
import { LocalStrategyController } from './local-strategy/local-strategy.controller';


@Module({
  imports: [
    DatabaseModule,
  ],
  controllers: [
    LocalStrategyController,
  ],
  providers: [
    AuthService,
  ],
})
export class AuthModule { }
