import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import KeyvRedis from '@keyv/redis';
import { Keyv } from 'keyv';

@Global()
@Module({
  imports: [
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host = configService.get<string>('REDIS_HOST', 'localhost');
        const port = configService.get<number>('REDIS_PORT', 6379);

        return {
          stores: [
            // Redis store — shared across all app instances
            new Keyv({
              store: new KeyvRedis(`redis://${host}:${port}`),
              namespace: 'elevator',
            }),
          ],
          ttl: 60000, // default 60s TTL for all cached values
        };
      },
      isGlobal: true,
    }),
  ],
})
export class AppCacheModule {}
