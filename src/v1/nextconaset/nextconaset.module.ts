import { Module } from '@nestjs/common';
import { NextconasetService } from './nextconaset.service';
import { NextconasetController } from './nextconaset.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[HttpModule],
  controllers: [NextconasetController],
  providers: [NextconasetService],
  exports:[NextconasetService]
})
export class NextconasetModule {}
