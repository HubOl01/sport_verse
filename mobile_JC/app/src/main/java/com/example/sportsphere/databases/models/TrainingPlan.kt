package com.example.sportsphere.databases.models


/*
model User {
  idUser          Int              @id @default(autoincrement())
  email           String?          @unique
  username        String
  isBan           Boolean          @default(false)
  isAdmin         Boolean          @default(false)
  trainingPlans   TrainingPlan[]
  trainingResults TrainingResult[]
  createdAt       DateTime         @default(now())
  bookmarksTrainingPlan BookmarkedTrainingPlan[]
}

// Модель для тренировочных планов
model TrainingPlan {
  idTrainingPlan        Int                      @id @default(autoincrement())
  title                 String
  description           String
  startDate             DateTime?
  endDate               DateTime?
  createdAt             DateTime                 @default(now())
  PlanProgress          Float?
  exercises             Exercise[]
  trainingResults       TrainingResult[]
}
// Модель для вида спорта в трен. плане
model TypeOfSport {
  idTypeOfSport  Int          @id @default(autoincrement())
  trainingPlanId Int
  nameType       String
  trainingPlan   TrainingPlan @relation(fields: [trainingPlanId], references: [idTrainingPlan])
}

// Модель для категории в трен. плане
model Category {
  idCategory     Int          @id @default(autoincrement())
  trainingPlanId Int
  nameCategory   String
  trainingPlan   TrainingPlan @relation(fields: [trainingPlanId], references: [idTrainingPlan])
}

// Модель для упражнений в тренировочном плане
model Exercise {
  idExercise      Int              @id @default(autoincrement())
  trainingPlanId  Int
  name            String
  description     String
  exerciseResults ExerciseResult[]
  trainingPlan    TrainingPlan     @relation(fields: [trainingPlanId], references: [idTrainingPlan])
}

// Модель для результатов тренировки
model TrainingResult {
  id             Int          @id @default(autoincrement())
  userId         Int
  trainingPlanId Int
  exerciseId     Int
  date           DateTime
  duration       BigInt?
  difficulty     Int?         @default(5) // сложность тренировки от 0-10
  user           User         @relation(fields: [userId], references: [idUser])
  trainingPlan   TrainingPlan @relation(fields: [trainingPlanId], references: [idTrainingPlan])
}

// Модель для результатов упражнений
model ExerciseResult {
  idExerciseResult Int      @id @default(autoincrement())
  exerciseId       Int
  date             DateTime
  duration         BigInt?
  distance         Float?

  doneExercise  Boolean?
  resultsNumber Float?

  exercise Exercise @relation(fields: [exerciseId], references: [idExercise])

 model BookmarkedTrainingPlan {
    id             Int          @id @default(autoincrement())
    userId         Int
            trainingPlanId Int
            // Связь с пользователем
            user           User         @relation(fields: [userId], references: [idUser])
    // Связь с тренировочным планом
    trainingPlan   TrainingPlan @relation(fields: [trainingPlanId], references: [idTrainingPlan])
}
}*/

import androidx.room.Embedded
import androidx.room.Entity
import androidx.room.PrimaryKey
import androidx.room.Relation
import androidx.room.TypeConverters
import com.example.sportsphere.utilities.ExerciseConverter
import com.example.sportsphere.utilities.TrainingResultConverter
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.*


fun getDateFormaters(localDateTime: LocalDateTime): String {
    return localDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
}

@Entity
data class TypeOfSport(
    @PrimaryKey(autoGenerate = true) val idTypeOfSport: Int = 0,
    val nameType: String,
    val colorType: String?,
)

@Entity
data class Category(
    @PrimaryKey(autoGenerate = true) val idCategory: Int = 0,
    val nameCategory: String,
    val colorCategory: String?,
)

@Entity
data class TypesOnPlans(
    @PrimaryKey(autoGenerate = true) val idTypesOnPlans: Long,
    val trainingPlanId: Int,
    val typeOfSportId: Int,
)

data class TypeOfSportWithPlans(
    @Embedded val trainingPlan: TrainingPlan,
    @Relation(
        parentColumn = "idTrainingPlan",
        entityColumn = "trainingPlanId"
    )
    val typesOnPlansIDs: List<TypesOnPlans>
)
data class CategoryWithPlans(
    @Embedded val trainingPlan: TrainingPlan,
    @Relation(
        parentColumn = "idTrainingPlan",
        entityColumn = "trainingPlanId"
    )
    val categoriesOnPlans: List<CategoriesOnPlans>
)
@Entity
data class CategoriesOnPlans(
    @PrimaryKey(autoGenerate = true) val idCategoriesOnPlans: Long,
    val trainingPlanId: Int,
    val categoryId: Int,
)


@Entity(tableName = "training_plan")
data class TrainingPlan(
    @PrimaryKey(autoGenerate = true)
    val idTrainingPlan: Int = 0,

    val title: String,

    val description: String,

    val startDate: String? = getDateFormaters(LocalDateTime.now()),

    val endDate: String? = getDateFormaters(LocalDateTime.now()),

    val createdAt: String? = getDateFormaters(LocalDateTime.now()),

    val PlanProgress: Float? = 0f,

    // Зависимости от других таблиц

//    @Relation(parentColumn = "idTrainingPlan", entityColumn = "trainingPlanId")
//    val typeOfSport: List<TypeOfSport>,
//
//    @Relation(parentColumn = "idTrainingPlan", entityColumn = "trainingPlanId")
//    val categories: List<Category>,
//
//
//    @Relation(parentColumn = "idTrainingPlan", entityColumn = "trainingPlanId")
//    val trainingResults: List<TrainingResult>,

//    @Relation(
//        parentColumn = "idTrainingPlan",
//        entityColumn = "trainingPlanId",
//    )
//    val typesOnPlans: List<TypeOfSport>,
//    @Relation(
//        parentColumn = "idTrainingPlan",
//        entityColumn = "trainingPlanId",
//    )
//    val categoriesOnPlans: List<Category>,
)
data class ExerciseWithResults(
    @Embedded val exercise: Exercise,
    @Relation(
        parentColumn = "idExercise",
        entityColumn = "exerciseId"
    )
    val results: List<ExerciseResult>
)

data class TrainingPlanWithResults(
    @Embedded val trainingPlan: TrainingPlan,
    @Relation(
        parentColumn = "idTrainingPlan",
        entityColumn = "trainingPlanId"
    )
    val trainingResults: List<TrainingResult>
)
@Entity(tableName = "exercise")

data class Exercise(
    @PrimaryKey(autoGenerate = true)
    val idExercise: Int = 0,

    val trainingPlanId: Int,

    val name: String,

    val description: String,

    val duration: Long? = 0,

    val distance: Float? = 0f,

    val resultsNumber: Float? = 0f,

    // Зависимость от другой таблицы
    @Relation(parentColumn = "trainingPlanId", entityColumn = "idTrainingPlan")
    val trainingPlan: TrainingPlan
)

// Модель для результатов тренировки
@Entity(tableName = "training_result")
data class TrainingResult(
    @PrimaryKey(autoGenerate = true)
    val idTrainingResult: Int = 0,

    val userId: Int,

    val trainingPlanId: Int,

    val exerciseId: Int,

    val date: String = getDateFormaters(LocalDateTime.now()),

    val duration: Long?,

    val difficulty: Int = 5,

    // Зависимости от других таблиц
    @Relation(parentColumn = "userId", entityColumn = "idUser")
    val user: User,

    @Relation(parentColumn = "trainingPlanId", entityColumn = "idTrainingPlan")
    val trainingPlan: TrainingPlan
)

// Модель для результатов упражнений
@Entity(tableName = "exercise_result")
data class ExerciseResult(
    @PrimaryKey(autoGenerate = true)
    val idExerciseResult: Int = 0,

    val exerciseId: Int,

    val date: String = getDateFormaters(LocalDateTime.now()),

    val duration: Long? = 0,

    val distance: Float? = 0f,

    val resultsNumber: Float? = 0f,

    val doneExercise: Boolean? = false,

    // Зависимость от другой таблицы
    @Relation(parentColumn = "exerciseId", entityColumn = "idExercise")
    val exercise: Exercise
)
//
//
@Entity(tableName = "bookmarked_training_plan")
data class BookmarkedTrainingPlan(
    @PrimaryKey(autoGenerate = true)
    val idBookmarkedTrainingPlan: Int,
    val userId: Int,
    @Relation(parentColumn = "userId", entityColumn = "idUser")
    val user: User,
    val trainingPlanId: Int,
    @Relation(parentColumn = "trainingPlanId", entityColumn = "idTrainingPlan")
    val trainingPlan: TrainingPlan
)

data class BookmarkedWithPlan(
    @Embedded val trainingPlan: TrainingPlan,
    @Relation(
        parentColumn = "idTrainingPlan",
        entityColumn = "trainingPlanId"
    )
    val trainingResults: List<BookmarkedTrainingPlan>
)
// https://dev.to/aseemwangoo/using-room-in-jetpack-compose-44a5