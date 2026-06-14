import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { Public } from '../auth/public.decorator';

@Controller('health')
export class HealthController {
    constructor(private readonly configService: ConfigService) {}

    @Get()
    @Public()
    async check() {
        const redisStatus = await this.pingRedis();

        return {
            status: redisStatus.ok ? 'ok' : 'degraded',
            timestamp: new Date(),
            services: {
                redis: redisStatus,
            },
        };
    }

    private async pingRedis(): Promise<{ ok: boolean; message: string; latencyMs?: number }> {
        const host = this.configService.get<string>('REDIS_HOST', 'localhost');
        const port = this.configService.get<number>('REDIS_PORT', 6379);

        const client = new Redis({ host, port, connectTimeout: 3000, lazyConnect: true });

        try {
            await client.connect();
            const start = Date.now();
            const pong = await client.ping();          // sends PING, expects "PONG"
            const latencyMs = Date.now() - start;

            return { ok: pong === 'PONG', message: pong, latencyMs };
        } catch (err) {
            return { ok: false, message: (err as Error).message };
        } finally {
            client.disconnect();
        }
    }
}
