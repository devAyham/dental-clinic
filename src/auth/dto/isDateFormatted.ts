// is-date-formatted.validator.ts
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
  ValidationArguments,
} from 'class-validator';
import { GraphQLError } from 'graphql';

@ValidatorConstraint({ name: 'isDateFormatted', async: false })
export class IsDateFormattedConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const validFormats = ['yyyy-mm-dd', 'dd-mm-yyyy'];
    const dateFormats = value.split('-');

    if (dateFormats.length !== 3) {
      throw new GraphQLError('Invalid date format ', {
        extensions: { code: 422 },
      });

      return false;
    }

    const isValidFormat = validFormats.some(validFormat =>
        validFormat.toLowerCase() === dateFormats.join('-').toLowerCase()
      );
    console.log(isValidFormat);
    
    console.log('Value:', value);
console.log('Date Formats:', dateFormats);
console.log('IsValidFormat:', isValidFormat);

    if (!isValidFormat) {
      throw new GraphQLError('Invalid date format 1 ', {
        extensions: { code: 422 },
      });

      console.log(213213123);
      return false;
    }

    const [year, month, day] = dateFormats.map(Number);

    return year > 0 && month >= 1 && month <= 12 && day >= 1 && day <= 31;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Invalid date format';
  }
}

export function IsDateFormatted(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsDateFormattedConstraint,
    });
  };
}
