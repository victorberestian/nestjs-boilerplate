import { Column, CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { Expose, Type } from 'class-transformer';
import { IsUUID, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Bar } from '../model';

@Entity({ name: 'foo' })
export class Foo {
    @Column()
    @Expose({ groups: [FooExposeGroup.READ, FooExposeGroup.FIXTURE, FooExposeGroup.PROFILER] })
    @IsUUID('4', { always: true })
    @ApiProperty({ type: () => String, readOnly: true, format: 'uuid' })
    uuid: string;

    @Column(() => Bar)
    @Type(() => Bar)
    @Expose({ groups: [FooExposeGroup.READ, FooExposeGroup.CREATE, FooExposeGroup.PUT, FooExposeGroup.PATCH, FooExposeGroup.FIXTURE, FooExposeGroup.PROFILER] })
    @ValidateNested({ always: true })
    @ApiProperty({ type: () => Bar })
    bar: Bar;

    @CreateDateColumn()
    @Expose({ groups: [FooExposeGroup.READ, FooExposeGroup.FIXTURE] })
    @Type(() => Date)
    @ApiProperty({ type: () => Date })
    createdAt: Date;

    @UpdateDateColumn()
    @Expose({ groups: [FooExposeGroup.READ, FooExposeGroup.FIXTURE] })
    @Type(() => Date)
    @ApiProperty({ type: () => Date })
    updatedAt: Date;
}
