import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { TierModule } from './tier/tier.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { ConfigModule } from '@nestjs/config';
import { RolesGuard } from './common/guards/roles.guard';
import { HealthController } from './health/health.controller';
import { ModulesModule } from './modules/modules.module';
import { PrismaModule } from './prisma/prisma.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { envValidationSchema } from './config/env.validation';
import { AppCacheModule } from './cache/cache.module';

@Module({
  imports: [
    // ── Config ──────────────────────────────────────────────
    // Validates all env vars at startup — app won't boot if anything is missing
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: envValidationSchema,
    }),

    // ── Rate Limiting ────────────────────────────────────────
    // Global: 100 requests per 60 seconds per IP
    // Override per-route with @Throttle() or @SkipThrottle()
    ThrottlerModule.forRoot([
      {
        name: 'global',
        ttl: 60000,   // 60 seconds window
        limit: 100,   // max requests per window
      },
    ]),

    // ── Cache (Redis + in-memory L1/L2) ─────────────────────
    AppCacheModule,

    // ── Core Modules ─────────────────────────────────────────
    PrismaModule,
    AuthModule,
    UserModule,
    SubscriptionModule,
    TierModule,
    ModulesModule,
  ],
  controllers: [AppController, HealthController],
  providers: [
    AppService,
    // Rate limiting guard applied globally
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    // JWT auth applied globally — use @Public() to opt out
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // Role-based access — use @Roles() to restrict routes
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule { }
