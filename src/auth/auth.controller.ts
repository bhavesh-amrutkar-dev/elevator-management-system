import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';
import { Public } from './public.decorator';
import { loginDto } from './dto/login.dto';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Auth') // Group name in Swagger
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 🔐 Register
  /*
  @Post('register')
  @Public()

  @ApiOperation({
    summary: 'Register User',
    description: 'Creates a new user account',
  })

  @ApiBody({
    type: RegisterDto,
  })

  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
  })

  @ApiResponse({
    status: 400,
    description: 'Bad request',
  })

  async register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }
  */

  // 🔐 Login
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @Public()

  @ApiOperation({
    summary: 'User Login',
    description: 'Login using email and password',
  })

  @ApiBody({
    type: loginDto,
    description: 'Login credentials',
  })

  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      example: {
        access_token: 'jwt_token_here',
        user: {
          id: 1,
          email: 'user@gmail.com',
        },
      },
    },
  })

  @ApiResponse({
    status: 401,
    description: 'Invalid email or password',
  })

  async login(@Body() body: loginDto) {
    const result = await this.authService.login(body);

    return result;
  }
}