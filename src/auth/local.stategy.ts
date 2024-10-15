import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username, password): Promise<any> {
    //validate user here
    const user = this.authService.validateUser({
      username: username,
      password: password,
    });

    console.log('user', user);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}