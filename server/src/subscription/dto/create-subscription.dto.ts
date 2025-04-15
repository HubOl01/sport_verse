import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateSubscriptionDto {
  @ApiProperty({ required: true })
  @IsNumber()
  subscriberId: number;
  @ApiProperty({ required: true })
  @IsNumber()
  subscribedToId: number;
}
