import type { EntitySubscriberInterface, InsertEvent, RemoveEvent, UpdateEvent } from 'typeorm';
import { DataSource, EventSubscriber } from 'typeorm';
import { v4 as uuid } from 'uuid';
import type { LoggerService, Type } from '@nestjs/common';
import { Foo } from '../entity';
import { EventBus } from '@nestjs/cqrs';

@EventSubscriber()
export class FooSubscriber implements EntitySubscriberInterface<Foo> {
    private logger: LoggerService;

    constructor(dataSource: DataSource, private readonly eventBus: EventBus) {
        dataSource.subscribers.push(this);
    }

    listenTo(): Type<Foo> {
        return Foo;
    }

    async beforeInsert(event: InsertEvent<Foo>): Promise<void> {
        event.entity.uuid = uuid();
    }

    async afterInsert(event: InsertEvent<Foo>): Promise<void> {
    }

    async beforeUpdate(event: UpdateEvent<Foo>): Promise<void> {
    }

    async afterUpdate(event: UpdateEvent<Foo>): Promise<void> {
    }

    async afterRemove(event: RemoveEvent<Foo>): Promise<void> {
    }
}
