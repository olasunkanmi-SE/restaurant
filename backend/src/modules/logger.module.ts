import { Module } from '@nestjs/common';
import { TYPES } from 'src/application';
import { ApplicationLogger } from 'src/infrastructure';

@Module({
  providers: [
    { provide: TYPES.IApplicationLogger, useClass: ApplicationLogger },
  ],
})
export class LoggerModule {}
