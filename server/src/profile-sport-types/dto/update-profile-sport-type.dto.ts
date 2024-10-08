import { PartialType } from '@nestjs/swagger';
import { CreateProfileSportTypeDto } from './create-profile-sport-type.dto';

export class UpdateProfileSportTypeDto extends PartialType(CreateProfileSportTypeDto) {}
