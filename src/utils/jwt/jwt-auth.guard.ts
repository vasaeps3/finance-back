import { ExecutionContext, Injectable, UnauthorizedException, } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { NoTokenError } from '../errors/no-token';
import { TokenExpiredError } from '../errors/token-expired';
import { JsonWebTokenError } from '../errors/json-web-token';



@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (info) {
      switch (info.name) {
        case 'TokenExpiredError': {
          throw new TokenExpiredError();
        }
        case 'JsonWebTokenError': {
          throw new JsonWebTokenError();
        }
        case 'Error': {
          throw new NoTokenError();
        }
        default: {
          throw new JsonWebTokenError();
        }
      }
    }

    if (err || !user) {
      throw err || new UnauthorizedException();
    }

    return user;
  }
}
