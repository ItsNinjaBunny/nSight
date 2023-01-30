import { Controller, Headers, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './services';
import { LocalGuard, RtGuard } from './guards';
import { Cookie, GetCurrentUser, GetCurrentUserId, Public } from '@app/common';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @UseGuards(LocalGuard)
  @Post('login')
  async login(
    @Req() req: any,
    @Res({ passthrough: true }) res: Response,
  ) {

    const user = req.user as { id: string };

    const { accessToken, refreshToken, success } = await this.authService.login(user);
    res.cookie('refreshToken', refreshToken, {
      // httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    });
    return {
      accessToken,
      success,
    };
  }

  @Public()
  // @UseGuards(RtGuard)
  @Get('test')
  async test(
    @Headers() headers: any,
    // @Cookie('refreshToken')
    // rt: string,
    // @GetCurrentUserId()
    // id: string,
  ) {
    console.log(headers);
    // console.log('rt', rt, 'id', id);
    return;
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  async refreshTokens(
    @GetCurrentUserId()
    id: string,
    @Cookie('refreshToken')
    rt: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken, refreshToken, success } = await this.authService.refreshTokens(id, rt);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    return {
      accessToken,
      success,
    }
  }

  @Post('logout')
  async logout(
    @GetCurrentUserId()
    id: string,
  ) {
    return this.authService.logout(id);
  }
}