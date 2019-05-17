import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Connection, Repository } from 'typeorm';
import * as crypto from 'crypto';



@Injectable()
export class AuthService {

  constructor(
    // private readonly jwtService: JwtService,
    // private connection: Connection,
  ) { }

  // private get repository(): Repository<User> {
  //   return this.connection.getRepository(User);
  // }

  // async signIn(): Promise<string> {
  //   // In the real-world app you shouldn't expose this method publicly
  //   // instead, return a token once you verify user credentials
  //   const user = { email: 'user@email.com' };
  //   // return this.jwtService.sign(user);
  // }


}
