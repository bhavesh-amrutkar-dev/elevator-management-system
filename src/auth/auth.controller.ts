import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';
import { Public } from './public.decorator';
import { loginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 🔐 Register
//   @Post('register')
//   @Public()
//   async register(@Body() data: RegisterDto) {
//     return this.authService.register(data);
//   }

  // 🔐 Login
  @Post('login')
  @Public()
  async login(@Body() body: loginDto) {
    const result = await this.authService.login(body);

    return result; 
  }
}