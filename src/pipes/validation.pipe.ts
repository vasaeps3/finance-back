import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common';
import { validate, ValidatorOptions, validateOrReject } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errorsList = await validate(object);

    if (errorsList.length > 0) {
      const transformError = errorsList.map(err => {
        const { constraints } = err;
        const messages = Object.keys(constraints).map(key => constraints[key]);

        return { property: err.property, messages };
      });

      throw new BadRequestException(transformError);
    }

    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}