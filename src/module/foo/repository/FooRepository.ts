import { MongoRepository } from 'typeorm';
import type { Foo } from '../entity';

export class FooRepository extends MongoRepository<Foo> {
    async findByIdOrFail(uuid: string): Promise<Foo> {
        return this.findOneByOrFail({ uuid });
    }

    async queryPage(limit: number, offset: number): Promise<[Foo[], number]> {
        return this.findAndCount({ take: limit, skip: offset });
    }
}
