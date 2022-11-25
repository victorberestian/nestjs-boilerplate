import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { HealthCheckResult } from '@nestjs/terminus';
import { HealthCheck, HealthCheckService } from '@nestjs/terminus';

@Controller('api/health')
@ApiTags('health')
export class HealthController {
    constructor(private readonly health: HealthCheckService) {}

    @Get()
    @HealthCheck()
    async check(): Promise<HealthCheckResult> {
        return this.health.check([]);
    }
}
