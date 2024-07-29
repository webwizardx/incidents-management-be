import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateIncidentDto } from './create-incident.dto';

export class PatchIncidentDto extends PartialType(
  OmitType(CreateIncidentDto, ['comment'])
) {}
