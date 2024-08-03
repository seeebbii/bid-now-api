import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable, tap } from 'rxjs';
import { ApiResponse, createResponse } from './wrapper/api-transform.wrapper';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();


    return next.handle().pipe(
      tap(data => {

        // Setting the status code of the response
        if (data.status_code) {
          response.status(data.status_code)
        } else {
          response.status(200)
        }

        // Remove password field if it exists in the data
        if (data && data.data && data.data.password) {

          delete data.data.password;
        }

        if (data && !(data instanceof ApiResponse)) {

          // Wrapping the response in ApiResponse format
          response.json(createResponse({ success: false, data, statusCode: data.status_code }));
        }
      })
    );
  }
}
