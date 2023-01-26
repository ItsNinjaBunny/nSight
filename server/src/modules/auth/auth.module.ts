import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { HelperModule, PrismaModule } from '@app/common';
import { AtStrategy, AuthService, LocalStrategy, RtStrategy, } from './services';
import { LocalGuard, AtGuard, RtGuard } from './guards';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({}),
    PrismaModule,
    HelperModule,
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    LocalGuard,
    AtStrategy,
    AtGuard,
    RtStrategy,
    RtGuard,
  ],
  exports: [
    AtGuard,
  ]
})
export class AuthModule { }
