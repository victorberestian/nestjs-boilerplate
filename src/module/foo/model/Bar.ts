import { Column } from 'typeorm';
import { Expose } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Bar {
    @Column()
    @Expose({ groups: [FooExposeGroup.READ, FooExposeGroup.CREATE, FooExposeGroup.PUT, FooExposeGroup.PATCH, FooExposeGroup.FIXTURE, FooExposeGroup.PROFILER] })
    @IsNotEmpty({ always: true })
    @IsString({ always: true })
    @ApiProperty({ type: () => String })
    buz: string;
}
