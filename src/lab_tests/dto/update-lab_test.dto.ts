import { PartialType } from '@nestjs/swagger';
import { CreateLabTestDto } from './create-lab_test.dto';

export class UpdateLabTestDto extends PartialType(CreateLabTestDto) {}
