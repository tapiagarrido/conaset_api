import { Module } from '@nestjs/common';
import { ErrorController } from './error/error.controller';

@Module({
  controllers: [ErrorController]
})
export class ErrorModule {}
