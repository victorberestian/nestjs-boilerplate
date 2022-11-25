import { Injectable } from '@nestjs/common';
import { FooRepository } from '../repository';

@Injectable()
export class FooService {
    constructor(private readonly repository: FooRepository) {
    }
}
