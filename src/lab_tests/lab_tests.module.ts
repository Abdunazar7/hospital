import { Module } from '@nestjs/common';
import { LabTestsService } from './lab_tests.service';
import { LabTestsController } from './lab_tests.controller';

@Module({
  controllers: [LabTestsController],
  providers: [LabTestsService],
})
export class LabTestsModule {}
