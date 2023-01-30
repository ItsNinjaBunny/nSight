import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'rt-jwt') {

  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('RT_JWT_TOKEN'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: { id: string }) {
    const refreshToken = req.get('authorization').replace('Bearer ', '').trim();
    console.log('rt', refreshToken)
    return {
      ...payload,
      refreshToken,
    }
  }
}