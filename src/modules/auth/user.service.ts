import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import * as crypto from 'crypto';

import { User } from '../../db/entity/user.entity';


@Injectable()
export class UserService {
  constructor(
    private connection: Connection,
  ) { }

  private get repository(): Repository<User> {
    return this.connection.getRepository(User);
  }

  public async add(user: User): Promise<User> {
    return this.repository.save({
      ...user,
      password: this.encryptPassword(user.password),
    });
  }

  public async getUserByEmail(email: User['email']): Promise<User> {
    return this.repository.findOne({ where: { email } });
  }

  public encryptPassword(password: string): string {
    return crypto.createHash('sha1').update(password).digest('hex');
  }

}
