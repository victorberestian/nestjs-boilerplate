import { BadRequestException, ValidationError, ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { TransformOptions } from 'class-transformer';

export interface ICreateValidateAndTransformPipe extends Omit<ValidationPipeOptions, 'transformOptions'> {
    transformOptions?: Omit<TransformOptions, 'groups'>;
}

export function createValidateAndTransformPipe(options?: ICreateValidateAndTransformPipe): ValidationPipe {
    return new ValidationPipe({
        ...options,
        transform: true,
        transformOptions: {
            groups: options?.groups,
            ...options?.transformOptions,
        },
        exceptionFactory(errors: ValidationError[]): BadRequestException {
            return new BadRequestException(errors);
        },
    });
}