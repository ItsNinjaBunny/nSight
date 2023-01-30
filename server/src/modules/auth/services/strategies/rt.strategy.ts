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
      jwtFromRequest: ExtractJwt.fromExtractors([(req: Request) => {
        console.log('looking for cookie');
        console.log('cookies', req.cookies);
        let data = req?.cookies['refreshToken'];
        if (!data) return null;

        return data;
      }]),
      ignoreExpiration: false,
      secretOrKey: config.get('RT_JWT_TOKEN'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: { id: string }) {
    const refreshToken = req.get('cookie').replace('refreshToken=', '').trim();
    return {
      ...payload,
      refreshToken,
    }
    // const refreshToken = req.get('authorization').replace('Bearer ', '').trim();
    // return {
    //   ...payload,
    //   refreshToken,
    // }
  }
}