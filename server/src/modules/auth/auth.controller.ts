import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './services';
import { LocalGuard, RtGuard } from './guards';
import { GetCurrentUser, GetCurrentUserId, Public } from '@app/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @UseGuards(LocalGuard)
  @Post('login')
  async login(
    @Request() req: any
  ) {
    const user = req.user as { id: string, email: string };

    return this.authService.login(user);
  }

  @Public()
  @UseGuards(RtGuard)
  @Post('refresh')
  async refreshTokens(
    @GetCurrentUserId()
    id: string,
    @GetCurrentUser('refreshToken')
    refreshToken: string
  ) {
    return this.authService.refreshTokens(id, refreshToken);
  }

  @Post('logout')
  async logout(
    @GetCurrentUserId()
    id: string,
  ) {
    return this.authService.logout(id);
  }
}