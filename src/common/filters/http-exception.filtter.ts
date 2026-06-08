import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Something went wrong';
    let errors: any[] = [];

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse: any = exception.getResponse();

      message =
        exceptionResponse?.message || exception.message || message;

      if (Array.isArray(exceptionResponse?.message)) {
        errors = exceptionResponse.message;
        message = 'Validation failed';
      }
    }

    response.status(status).json({
      isSuccess: false,
      message,
      ...(errors.length > 0 && { errors }),
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}