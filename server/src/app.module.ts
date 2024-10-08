import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { ProfilesModule } from './profiles/profiles.module';
import { RolesModule } from './roles/roles.module';
import { StatusesModule } from './profile-statuses/statuses.module';
import { SportTypesModule } from './sport-types/sport-types.module';
import { ProfileSportTypesModule } from './profile-sport-types/profile-sport-types.module';
import { TrainingPlansModule } from './training-plans/training-plans.module';
import { PlanExercisesModule } from './plan-exercises/plan-exercises.module';
import { ExercisesModule } from './exercises/exercises.module';
import { ExerciseCategoriesModule } from './exercise-categories/exercise-categories.module';
import { ExerciseSetsModule } from './exercise-sets/exercise-sets.module';
import { TrainingResultsModule } from './training-results/training-results.module';
import { PublishStatusesModule } from './publish-statuses/publish-statuses.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    ProfilesModule,
    RolesModule,
    StatusesModule,
    SportTypesModule,
    ProfileSportTypesModule,
    TrainingPlansModule,
    PlanExercisesModule,
    ExercisesModule,
    ExerciseCategoriesModule,
    ExerciseSetsModule,
    TrainingResultsModule,
    PublishStatusesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
