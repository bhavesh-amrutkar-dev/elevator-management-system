import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  generateToken(user: any): string {
    const payload = {
      id: user.id,
      email: user.email,
      role: user.role.name,
      organization: user.organization.name,
    };

    return this.jwtService.sign(payload);
  }
}