import { ExceptionFilter, Catch, ArgumentsHost, HttpException, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';


@Catch(BadRequestException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    const errorResponse = exception.message;
    let { message } = errorResponse;

    if (Array.isArray(message)) {
      message = message.map(err => {
        const { constraints } = err;
        if (!constraints) {
          return { property: err.property, messages: err.messages };
        }
        const messages = Object.keys(constraints).map(key => constraints[key]);

        return { property: err.property, messages };
      });
    }

    response
      .status(status)
      .json({
        ...errorResponse,
        timestamp: new Date().toISOString(),
        path: request.url,
        message,
      });
  }
}