import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FooController } from './controller';
import { FooService } from './service';
import { FooSubscriber } from './subscriber';
import { FooRepository } from './repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [ConfigModule, TypeOrmModule.forFeature([FooRepository])],
    controllers: [FooController],
    providers: [FooService, FooSubscriber],
    exports: [FooService],
})
export class FooModule {}
