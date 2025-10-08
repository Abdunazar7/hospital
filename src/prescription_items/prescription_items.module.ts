import { Module } from '@nestjs/common';
import { PrescriptionItemsService } from './prescription_items.service';
import { PrescriptionItemsController } from './prescription_items.controller';

@Module({
  controllers: [PrescriptionItemsController],
  providers: [PrescriptionItemsService],
})
export class PrescriptionItemsModule {}
