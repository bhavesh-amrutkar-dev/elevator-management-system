import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { loginDto } from './dto/login.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) { }

  // 🔐 Generate Token
  generateToken(user: any): string {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role, // if enum
      organization: user.organization,
    };

    return this.jwtService.sign(payload);
  }

  // 🔍 Validate User
  async validateUser(data: loginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
      include: {
        role: true,
        organization: true,
      },
    });

    if (!user || !user.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordMatch = await bcrypt.compare(
      data.password,
      user.password,
    );

    if (!isPasswordMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Remove password before returning
    const { password, ...result } = user;

    return result;
  }

  async login(data: loginDto) {
    const user = await this.validateUser(data);

    const accessToken = this.generateToken(user);

    return {
      accessToken,
    };
  }
}