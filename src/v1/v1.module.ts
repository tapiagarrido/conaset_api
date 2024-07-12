import { Module } from '@nestjs/common';
import { NextconasetModule } from './nextconaset/nextconaset.module';

@Module({
  controllers: [],
  providers: [],
  imports: [NextconasetModule],
})
export class V1Module {}
