import { z } from 'zod';

export const schemaValidationError: z.ZodErrorMap = (error, ctx) => {
  // This is where you override the various error codes
  switch (error.code) {
    case z.ZodIssueCode.invalid_type:
      if (error.expected === 'string') {
        return { message: `${error.path[1]} should be a string` };
      }
      if (error.expected === 'number') {
        return { message: `${error.path[1]} should be a number` };
      }
      if (error.expected === 'array') {
        return { message: `${error.path[1]} should be an array` };
      }
      break;
    case z.ZodIssueCode.invalid_enum_value:
      const options: (string | number)[] = error.options;
      const errorMessage = options.toString().replace(',', ' or ');
      return { message: `${error.path[1]} should be ${errorMessage}` };
    case z.ZodIssueCode.too_small:
      if (error.type === 'array') {
        return { message: `${error.path[1]} should have at lease one character` };
      }
      if (error.type === 'string') {
        return { message: `${error.path[1]} should have at lease one character` };
      }
      break;
    case z.ZodIssueCode.too_big:
      if (error.type === 'array') {
        return { message: `${error.path[1]} length is too large` };
      }
      if (error.type === 'string') {
        return { message: `${error.path[1]} length is too large` };
      }
      break;
    default:
      break;
  }
  return { message: ctx.defaultError };
};
