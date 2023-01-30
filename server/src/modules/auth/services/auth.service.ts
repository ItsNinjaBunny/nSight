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

    if(!user.id && !user.password) return null;

    if(!await this.encryptionService.compare(password, user.password)) return null;

    return { id: user.id };
  }

  async login(payload: { id: string }) {
    const [accessToken, refreshToken] = await this.generateTokens(payload.id);
    if(!accessToken || !refreshToken) throw new HttpException('Error at login', HttpStatus.UNAUTHORIZED);

    const id = await this.updateRefreshToken(payload.id, refreshToken);

    return {
      id,
      accessToken,
      refreshToken,
      success: true,
    };
  }

  async logout(id: string) {
    await this.prisma.session.delete({
      where: {
        userId: id
      }
    });

    return { session: 'deleted' };
  }

  async updateRefreshToken(userId: string, rt: string) {
    const hash = await this.encryptionService.hash(rt, 10);

    const { id } = await this.prisma.$transaction(async (prisma) => {
      const session = await prisma.session.findUnique({
        where: {
          userId: userId,
        }
      });

      return session ? await prisma.session.update({
        where: {
          userId: userId
        },
        data: {
          sessionToken: hash,
        },
        select: { id: true }
      }) : await prisma.session.create({
        data: {
          userId: userId,
          sessionToken: hash,
        },
        select: { id: true }
      });
    });

    return id;
  }

  async refreshTokens(id: string, rt: string) {
    const session = await this.prisma.session.findUnique({
      where: {
        userId: id
      },
      select: {
        sessionToken: true,
      }
    });

    if(!session) throw new HttpException({
      error: 'Session not found',
      status: HttpStatus.UNAUTHORIZED,
      success: false,
    }, HttpStatus.UNAUTHORIZED);

    const isValid = await this.encryptionService.compare(rt, session.sessionToken);

    if(!isValid) throw new HttpException({
      error: 'Invalid refresh token',
      status: HttpStatus.UNAUTHORIZED,
      success: false,
    }, HttpStatus.UNAUTHORIZED);

    const [accessToken, refreshToken] = await this.generateTokens(id);

    if(!accessToken || !refreshToken) throw new HttpException({
      error: 'Error at refresh tokens',
      status: HttpStatus.BAD_REQUEST,
      success: false,
    }, HttpStatus.BAD_REQUEST);

    await this.updateRefreshToken(id, refreshToken);

    return {
      success: true,
      accessToken,
      refreshToken,
    };
  }

  async generateTokens(id: string) {
    return await Promise.all([
      this.jwtService.sign({ id }, {
        secret: this.config.get<string>('AT_JWT_TOKEN'),
        expiresIn: 60 * 15,
      }),
      this.jwtService.sign({ id }, {
        secret: this.config.get<string>('RT_JWT_TOKEN'),
        expiresIn: 60 * 60 * 24 * 7,
      }),
    ]);
  }
}