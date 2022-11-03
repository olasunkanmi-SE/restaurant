import { HttpException } from '@nestjs/common';
export const throwApplicationError = (status: number, error: string) => {
  throw new HttpException(
    {
      status,
      error,
    },
    status,
  );
};
