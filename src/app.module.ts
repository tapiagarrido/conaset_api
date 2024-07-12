import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { V1Module } from './v1/v1.module';

@Module({
  imports: [HttpModule, V1Module],
  controllers: [],
  providers: [],
})
export class AppModule { }
