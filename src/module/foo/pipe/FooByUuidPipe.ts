import type { PipeTransform } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { Foo } from '../entity';
import { FooService } from '../service';

@Injectable()
export class FooByUuidPipe implements PipeTransform<string, Promise<Foo>> {
    constructor(private readonly fooService: FooService) {}

    async transform(uuid: string): Promise<Foo> {
        return this.fooService.getByUuid(uuid);
    }
}
