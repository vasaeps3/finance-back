import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class JwtCustomService {
  constructor(
    private readonly jwtService: JwtService,
  ) { }

  public generateUserToken(payload) {
    return this.generateToken(payload, '30 days', 'HS256');
  }

  public generateRegistrationToken(payload) {
    return this.generateToken(payload, '2h', 'HS256');
  }

  public generateResetToken(payload) {
    return this.generateToken(payload, '1h', 'HS256');
  }

  public verifyAndDecodeToken(token: string): any {
    return this.verifyAndDecodeToken(token);
  }

  private generateToken(payload: object, expIn, alg = 'HS256') {
    return this.jwtService.sign({ ...payload }, {
      algorithm: alg,
      expiresIn: expIn,
    });
  }
}
