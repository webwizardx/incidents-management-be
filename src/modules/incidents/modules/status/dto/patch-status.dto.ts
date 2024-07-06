import { PartialType } from '@nestjs/swagger';
import { CreateStatusDto } from './create-status.dto';

export class PatchStatusDto extends PartialType(CreateStatusDto) {}
