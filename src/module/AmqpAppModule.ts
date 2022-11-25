import type { DynamicModule } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

export const connections: string[] = (process.env.RABBITMQ_URL || '').split('|').filter((s: string) => s.trim().length);

@Module({
    imports: [
        ConfigModule.forRoot({ cache: true }),
        ClientsModule.register([
            {
                name: 'default-name',
                transport: Transport.RMQ,
                options: {
                    urls: connections,
                    queue: 'some-name',
                },
            },
        ]),
    ],
})
export class AmqpAppModule {
    static withDatabases(): DynamicModule {
        return {
            module: AmqpAppModule,
            imports: [
                TypeOrmModule.forRootAsync({

                }),
            ],
        };
    }
}
