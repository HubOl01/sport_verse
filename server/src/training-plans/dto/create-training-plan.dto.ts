export class CreateTrainingPlanDto {
  title: string;
  statusPublishId: number;
  description: string;
  date_created: Date;
  userId: number;
  SportTypeId: number;
  date_start: Date;
  date_end: Date;
  statusTraining: number;
  sportTypeId: number;
}
