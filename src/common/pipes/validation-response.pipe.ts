import { ArgumentMetadata, BadRequestException, HttpStatus, Injectable, PipeTransform, ValidationError, ValidationPipe } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationResponsePipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new BadRequestException({
        success: false,
        status_code: HttpStatus.BAD_REQUEST,
        message: 'Validation error',
        errors: this.formatErrors(errors),
      });
    }

    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErrors(errors: any[]) {
    const result = {};
    errors.forEach(err => {
      const constraints = Object.values(err.constraints);
      result[err.property] = constraints;
    });
    return result;
  }
}