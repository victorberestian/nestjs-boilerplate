import {
    ClassSerializerInterceptor,
    Controller,
    Get,
    HttpStatus,
    Query,
    SerializeOptions,
    UseInterceptors,
} from '@nestjs/common';
import {
    ApiOkResponse,
    ApiOperation,
    ApiQuery,
    ApiTags,
} from '@nestjs/swagger';
import { FooService } from '../service';
import { createValidateAndTransformPipe } from '../../../utils/pipes/createValidateAndTransformPipe';

@Controller('api/v1/foos')
@ApiTags('foo')
@UseInterceptors(ClassSerializerInterceptor)
@SerializeOptions({ groups: [FooExposeGroup.READ] })
export class FooController {
    constructor(private readonly fooService: FooService) {}

    @Get()
    @ApiOperation({ description: 'List foos' })
    @ApiOkResponse({ type: () => ListFoosDto, description: HttpStatus[HttpStatus.OK] })
    @ApiQuery({ name: 'limit', type: () => Number, required: false, schema: { default: 10, minimum: 1, maximum: 100 } })
    @ApiQuery({ name: 'offset', type: () => Number, required: false, schema: { default: 0, minimum: 0 } })
    async list(@Query(createValidateAndTransformPipe()) requestDto: ListFoosRequestDto): Promise<IListFoosDto> {
        return this.fooService.list(requestDto);
    }

}
