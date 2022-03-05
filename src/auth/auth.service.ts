import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private prismaService: PrismaService,
  ) {}

  async sign(userId: number): Promise<{ token: string }> {
    const payload = { id: userId };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async verify(token: string): Promise<UserEntity | null> {
    try {
      const { id } = await this.jwtService.verify(token);
      if (id) {
        const user = await this.prismaService.user.findUnique({
          where: {
            id,
          },
        });
        return user ? user : null;
      }
      return null;
    } catch {
      return null;
    }
  }
}
