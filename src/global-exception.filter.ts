import {
  Catch,
  ExceptionFilter,
  ArgumentsHost,
  InternalServerErrorException,
} from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { TypeORMError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status: number;
    let message: unknown;

    if (exception instanceof TypeORMError) {
      status = HttpStatus.BAD_REQUEST;
      message = (exception as any).detail || (exception as any).message;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = (exception.getResponse() as any).message;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
      message = new InternalServerErrorException('Internal Server Error');
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      method: request.method,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}
