import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from '@nestjs/common';

@Catch(NotFoundException)
export class NotFoundExceptionFilter<T> implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    response
      .status(status)
      .json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
