import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'at-jwt') {
  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('AT_JWT_TOKEN'),
    });
  }

  async validate(payload: { id: string, email: string }) {
    return { id: payload.id, email: payload.email };
  }
}