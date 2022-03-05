import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import {
  CreateAccountInput,
  CreateAccountOutput,
} from './dtos/create-account.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { AuthService } from 'src/auth/auth.service';
import { EditProfileInput, EditProfileOutput } from './dtos/edit-profile.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private prismaService: PrismaService,
    private authService: AuthService,
  ) {}

  async createAccount({
    email,
    password,
    role,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const exist = await this.prismaService.user.findUnique({
        where: { email },
        select: {
          id: true,
        },
      });
      if (exist) {
        return {
          ok: false,
          error: 'This email already exist.',
        };
      }
      const hashPassword = await bcrypt.hash(password, 10);
      await this.prismaService.user.create({
        data: {
          email,
          password: hashPassword,
          role,
        },
      });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.prismaService.user.findUnique({
        where: {
          email,
        },
        select: {
          id: true,
          password: true,
        },
      });
      if (!user) {
        return {
          ok: false,
          error: 'This email does not exist.',
        };
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return {
          ok: false,
          error: 'This password is wrong.',
        };
      }
      const { token } = await this.authService.sign(user.id);
      return {
        ok: true,
        token,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }

  async editProfile(
    { email, password, role }: EditProfileInput,
    currentUser: UserEntity,
  ): Promise<EditProfileOutput> {
    try {
      let hashPassword;
      if (password) {
        hashPassword = await bcrypt.hash(password, 10);
      }
      await this.prismaService.user.update({
        where: {
          id: currentUser.id,
        },
        data: {
          ...(email && { email }),
          ...(role && { role }),
          ...(hashPassword && { password: hashPassword }),
        },
      });
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        error,
      };
    }
  }
}
