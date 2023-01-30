import { Controller, Post, UseGuards, HttpCode } from '@nestjs/common';
import { AuthService } from './services';
import { LocalGuard, RtGuard } from './guards';
import { GetCurrentUser, GetCurrentUserId, Public } from '@app/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @UseGuards(LocalGuard)
  @HttpCode(200)
  @Post('login')
  async login(
    @GetCurrentUser()
    user: { id: string },
  ) {
    console.log('user', user);

    const { accessToken, refreshToken, success } = await this.authService.login(user);
    return {
      accessToken,
      refreshToken,
      success,
    };
  }

  @Public()
  @UseGuards(RtGuard)
  @HttpCode(200)
  @Post('refresh')
  async refreshTokens(
    @GetCurrentUserId()
    id: string,
    @GetCurrentUser('refreshToken')
    rt: string,
  ) {
    const { accessToken, refreshToken, success } = await this.authService.refreshTokens(id, rt);

    return {
      accessToken,
      refreshToken,
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