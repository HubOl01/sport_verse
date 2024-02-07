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
import androidx.room.Junction
import androidx.room.PrimaryKey
import androidx.room.Relation
import androidx.room.TypeConverters
import com.example.sportsphere.utilities.CategoriesOnPlansConverter
import com.example.sportsphere.utilities.CategoryConverter
import com.example.sportsphere.utilities.ExerciseConverter
import com.example.sportsphere.utilities.ExerciseResultConverter
import com.example.sportsphere.utilities.TypeOfSportConverter
import com.example.sportsphere.utilities.TypesOnPlansConverter
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import java.util.*

fun getDateFormaters(localDateTime: LocalDateTime): String {
    return localDateTime.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"))
}

@Entity
@TypeConverters(TypesOnPlansConverter::class)
data class TypeOfSport(
    @PrimaryKey(autoGenerate = true) val idTypeOfSport: Int = 0,
    val nameType: String,
    val colorType: String?,
    @Relation(parentColumn = "idTypeOfSport", entityColumn = "typeOfSportId")
    val typesOnPlans: List<TypesOnPlans>,
)

@Entity
@TypeConverters(CategoriesOnPlansConverter::class)
data class Category(
    @PrimaryKey(autoGenerate = true) val idCategory: Int = 0,
    val nameCategory: String,
    val colorCategory: String?,
    @Relation(parentColumn = "idCategory", entityColumn = "categoryId")
    val categoriesOnPlans: List<CategoriesOnPlans>,
)

@Entity(primaryKeys = ["trainingPlanId", "typeOfSportId"])
data class TypesOnPlans(
    val trainingPlanId: Int,
    val typeOfSportId: Int,
)

@Entity
data class TypeOfSportWithPlans(
    @Embedded val typeOfSport: TypeOfSport,
    @Relation(
        parentColumn = "idTypeOfSport",
        entityColumn = "typeOfSportId"
    )
    val typesOnPlans: List<TypesOnPlans>
)

@Entity(primaryKeys = ["trainingPlanId", "categoryId"])
data class CategoriesOnPlans(
    val trainingPlanId: Int,
    val categoryId: Int,
)


@Entity(tableName = "training_plan")
@TypeConverters(
    TypesOnPlansConverter::class,
    CategoriesOnPlansConverter::class,
    TypeOfSportConverter::class,
    CategoryConverter::class,
    ExerciseConverter::class
)
data class TrainingPlan(
    @PrimaryKey(autoGenerate = true)
    val idTrainingPlan: Int = 0,

    val title: String,

    val description: String,

    val startDate: String? = getDateFormaters(LocalDateTime.now()),

    val endDate: String? = getDateFormaters(LocalDateTime.now()),

    val createdAt: String? = getDateFormaters(LocalDateTime.now()),

    val PlanProgress: Float?,

    // Зависимости от других таблиц

    @Relation(parentColumn = "idTrainingPlan", entityColumn = "trainingPlanId")
    val typeOfSport: List<TypeOfSport>,

    @Relation(parentColumn = "idTrainingPlan", entityColumn = "trainingPlanId")
    val categories: List<Category>,

    @Relation(parentColumn = "idTrainingPlan", entityColumn = "trainingPlanId")
    val exercises: List<Exercise>,

    @Relation(parentColumn = "idTrainingPlan", entityColumn = "trainingPlanId")
    val trainingResults: List<TrainingResult>,

    @Relation(
        parentColumn = "idTrainingPlan",
        entityColumn = "trainingPlanId",
    )
    val typesOnPlans: List<TypeOfSport>,
    @Relation(
        parentColumn = "idTrainingPlan",
        entityColumn = "trainingPlanId",
    )
    val categoriesOnPlans: List<Category>,
)

@Entity(tableName = "exercise")
@TypeConverters(ExerciseResultConverter::class)
data class Exercise(
    @PrimaryKey(autoGenerate = true)
    val idExercise: Int = 0,

    val trainingPlanId: Int,

    val name: String,

    val description: String,

    @Relation(parentColumn = "idExercise", entityColumn = "exerciseId")
    val exerciseResults: List<ExerciseResult>,


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

    val date: Date,

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

    val date: Date,

    val duration: Long?,

    val distance: Float?,

    val doneExercise: Boolean?,

    val resultsNumber: Float?,

    // Зависимость от другой таблицы
    @Relation(parentColumn = "exerciseId", entityColumn = "idExercise")
    val exercise: Exercise
)


@Entity(tableName = "bookmarked_training_plan")
data class BookmarkedTrainingPlan(
    @PrimaryKey(autoGenerate = true)
    val idBookmarkedTrainingPlan: Int,
    val userId: Int,
    @Relation(parentColumn = "userId", entityColumn = "idUser")
    val user: User,

    @Relation(parentColumn = "trainingPlanId", entityColumn = "idTrainingPlan")
    val trainingPlan: TrainingPlan
)
// https://dev.to/aseemwangoo/using-room-in-jetpack-compose-44a5