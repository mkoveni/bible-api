import { ApiProperty } from '@nestjs/swagger';

export default class Response {
    @ApiProperty({ name: 'statusCode', example: 404 })
    statusCode: number;

    @ApiProperty({ name: 'error', example: 'Not Found' })
    error: string;

    @ApiProperty({ name: 'message', example: 'Resource not found.' })
    message: string;
}
