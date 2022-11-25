import type { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthModule } from './health';
import { FooModule } from './foo';

@Module({
    imports: [
        HealthModule,
        FooModule,
    ],
    exports: [],
})
export class HttpAppModule {
    static withDatabases(): DynamicModule {
        return {
            module: HttpAppModule,
            imports: [
                TypeOrmModule.forRootAsync({
                }),
            ],
        };
    }
}
