import { EncryptionService, PrismaService } from '@app/common';
import { Credentials } from '@app/common';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class AuthService {

  constructor(
    @Inject(PrismaService)
    private readonly prisma: PrismaService,
    @Inject(ConfigService)
    private readonly config: ConfigService,
    @Inject(JwtService)
    private readonly jwtService: JwtService,
    @Inject(UsersService)
    private readonly usersService: UsersService,
    @Inject(EncryptionService)
    private readonly encryptionService: EncryptionService
  ) { }

  async validateUser({ email, password }: Credentials) {
    const user = await this.usersService.findOneByEmail(email.toLowerCase());

    if (!user.id && !user.password) return null;

    if (!await this.encryptionService.compare(password, user.password)) return null;

    return { id: user.id, email: email };
  }

  async login(payload: { id: string, email: string }) {
    const [accessToken, refreshToken] = await this.generateTokens(payload.id, payload.email);
    if (!accessToken || !refreshToken) throw new HttpException('Error at login', HttpStatus.UNAUTHORIZED);

    this.updateRefreshToken(payload.id, refreshToken);

    return {
      success: true,
      accessToken,
      refreshToken,
    };
  }

  async logout(id: string) {
    await this.prisma.session.delete({
      where: {
        userId: id
      }
    });

    return { sessionDeleted: true }
  }

  async updateRefreshToken(id: string, rt: string) {
    const hash = await this.encryptionService.hash(rt, 10);

    const session = await this.prisma.session.findUnique({
      where: {
        userId: id
      }
    });

    await this.prisma.$transaction([
      session ? this.prisma.session.update({
        where: {
          userId: id
        },
        data: {
          sessionToken: hash
        }
      }) : this.prisma.session.create({
        data: {
          userId: id,
          sessionToken: hash
        }
      }),
    ]);
  }

  async refreshTokens(id: string, rt: string) {
    const session = await this.prisma.session.findUnique({
      where: {
        userId: id
      },
      select: {
        sessionToken: true,
        user: {
          select: {
            email: true,
          }
        }
      }
    });

    if (!session) throw new HttpException('Session not found', HttpStatus.UNAUTHORIZED);

    const isValid = await this.encryptionService.compare(rt, session.sessionToken);

    if (!isValid) throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);

    const [accessToken, refreshToken] = await this.generateTokens(id, session.user.email);

    if (!accessToken || !refreshToken) throw new HttpException('Error at refresh tokens', HttpStatus.UNAUTHORIZED);

    await this.updateRefreshToken(id, refreshToken);

    return {
      success: true,
      accessToken,
      refreshToken,
    };
  }

  async generateTokens(id: string, email: string) {
    return await Promise.all([
      this.jwtService.sign({ id, email }, {
        secret: this.config.get<string>('AT_JWT_TOKEN'),
        expiresIn: 60 * 15,
      }),
      this.jwtService.sign({ id, email }, {
        secret: this.config.get<string>('RT_JWT_TOKEN'),
        expiresIn: 60 * 60 * 24 * 7,
      }),
    ]);
  }
}
