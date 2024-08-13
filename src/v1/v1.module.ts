import { Module } from '@nestjs/common';
import { NextconasetModule } from './nextconaset/nextconaset.module';
import { ErrorModule } from './error/error.module';

@Module({
  controllers: [],
  providers: [],
  imports: [NextconasetModule, ErrorModule],
})
export class V1Module {}
