import { PartialType } from '@nestjs/swagger';
import { CreateJoinRequestDto } from './create-join-request.dto';

export class UpdateJoinRequestDto extends PartialType(CreateJoinRequestDto) {}
