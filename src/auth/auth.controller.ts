import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Logger,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { Throttle } from '@nestjs/throttler';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Throttle({ global: { ttl: 60000, limit: 5 } })
  @Post('login')

  @HttpCode(HttpStatus.OK)
  @Public()
  @ApiOperation({
    summary: 'User Login',
    description: 'Login using email and password',
  })
  @ApiBody({
    type: LoginDto,
    description: 'Login credentials',
  })
  @ApiResponse({
    status: 200,
    description: 'Login successful',
    schema: {
      example: {
        accessToken: 'jwt_token_here',
      },
    },
  })
  @ApiResponse({ status: 401, description: 'Invalid email or password' })
  @ApiResponse({ status: 429, description: 'Too many requests' })
  async login(@Body() body: LoginDto) {
    this.logger.log(`Login attempt for email: ${body.email}`);

    try {
      const result = await this.authService.login(body);

      this.logger.log(`Login successful for email: ${body.email}`);

      return result;
    } catch (error) {
      this.logger.warn(
        `Login failed for email: ${body.email}. `,
      );

      throw error;
    }
  }
}