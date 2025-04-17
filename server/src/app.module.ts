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
import { StatusesTrainingModule } from './statuses-training/statuses-training.module';
import { СommentTrainingModule } from './сomment-training/comment-training.module';
import { ViewsTrainingModule } from './views-training/views-training.module';
import { LikeTrainingModule } from './like-training/like-training.module';
import { AuthModule } from './auth/auth.module';
import { NewsModule } from './news/news.module';
import { SportCategoriesModule } from './sport-categories/sport-categories.module';
import { TrainingGroupsModule } from './training-groups/training-groups.module';
import { AthleteInGroupsModule } from './athlete-in-groups/athlete-in-groups.module';
import { SubscriptionModule } from './subscription/subscription.module';
import { PlanInGroupsModule } from './plan-in-groups/plan-in-groups.module';
import { JoinRequestsModule } from './join-requests/join-requests.module';

@Module({
  imports: [
    AuthModule,
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
    StatusesTrainingModule,
    СommentTrainingModule,
    ViewsTrainingModule,
    LikeTrainingModule,
    NewsModule,
    SportCategoriesModule,
    TrainingGroupsModule,
    AthleteInGroupsModule,
    SubscriptionModule,
    PlanInGroupsModule,
    JoinRequestsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
