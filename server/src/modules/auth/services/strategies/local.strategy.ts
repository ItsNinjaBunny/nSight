import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {
    super({
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser({ email, password });

    if (!user) {
      throw new HttpException({
        status: 401,
        error: 'Invalid Credentials',
        success: false,
      }, 401);
    }

    return user;
  }
}