package com.example.sportsphere.screens.trainingPlans

import com.example.sportsphere.databases.models.Exercise
import com.example.sportsphere.databases.models.TrainingPlan
import com.example.sportsphere.databases.models.TypesOnPlans
import java.time.LocalDateTime

var listsTrainingPlan = arrayOf<TrainingPlan>(
    TrainingPlan(
        idTrainingPlan = 1,
        title = "Силовой прорыв",
        description = "“Силовой прорыв” - это интенсивная силовая тренировка, предназначенная для быстрого и эффективного развития мышечной массы и силы. Эта тренировка включает в себя различные упражнения с использованием собственного веса тела, гантелей и эспандеров, которые выполняются в несколько раундов и сетов.\n" +
                "\n" +
                "Цель “Силового прорыва” - обеспечить максимальное увеличение силы и мышечной массы за минимальное время. Эта тренировка идеально подходит для тех, кто хочет быстро достичь результатов и улучшить свою физическую форму. Для достижения наилучших результатов важно соблюдать правильную технику выполнения упражнений и регулярно увеличивать вес и количество повторений.",
        startDate = LocalDateTime.now(),
        endDate = LocalDateTime.now(),
        createdAt = LocalDateTime.now(),
        PlanProgress = 1f,
        typeOfSport = emptyList(),
        categories = emptyList(),
        exercises = emptyList(),
        trainingResults = emptyList(),
        TypesOnPlans = emptyList(),
        CategoriesOnPlans = emptyList()
    ),
    TrainingPlan(
        idTrainingPlan = 2,
        title = "Test",
        description = "",
        startDate = LocalDateTime.now(),
        endDate = LocalDateTime.now(),
        createdAt = LocalDateTime.now(),
        PlanProgress = 1f,
        typeOfSport = emptyList(),
        categories = emptyList(),
        exercises = emptyList(),
        trainingResults = emptyList(),
        TypesOnPlans = emptyList(),
        CategoriesOnPlans = emptyList()
    ),
    TrainingPlan(
        idTrainingPlan = 3,
        title = "Test1",
        description = "",
        startDate = LocalDateTime.now(),
        endDate = LocalDateTime.now(),
        createdAt = LocalDateTime.now(),
        PlanProgress = 0.7f,
        typeOfSport = emptyList(),
        categories = emptyList(),
        exercises = emptyList(),
        trainingResults = emptyList(),
        TypesOnPlans = emptyList(),
        CategoriesOnPlans = emptyList()
    ),
    TrainingPlan(
        idTrainingPlan = 4,
        title = "Test3",
        description = "",
        startDate = LocalDateTime.now(),
        endDate = LocalDateTime.now(),
        createdAt = LocalDateTime.now(),
        PlanProgress = 0.4f,
        typeOfSport = emptyList(),
        categories = emptyList(),
        exercises = emptyList(),
        trainingResults = emptyList(),
        TypesOnPlans = emptyList(),
        CategoriesOnPlans = emptyList()
    )
)


//
//val listsExercise: Array<Exercise> = arrayOf(
//    Exercise(
//        idExercise = 1,
//        trainingPlanId = listsTrainingPlan[0].idTrainingPlan,
//        name = "Отжимания",
//        description = "Это базовое упражнение для развития грудных мышц, трицепсов и дельтовидных мышц. Выполняйте его, опираясь на ладони и носки ног, с прямой спиной.",
//        exerciseResults = emptyList(),
//        trainingPlan = listsTrainingPlan[0]
//    ),
//    Exercise(
//        idExercise = 2,
//        trainingPlanId = listsTrainingPlan[0].idTrainingPlan,
//        name = "Приседания",
//        description = "Это упражнение укрепляет бедра, ягодицы и спину. Выполняется с прямой спиной, колени не должны выходить за пальцы ног.",
//        exerciseResults = emptyList(),
//        trainingPlan = listsTrainingPlan[0]
//    ),
//    Exercise(
//        idExercise = 3,
//        trainingPlanId = listsTrainingPlan[0].idTrainingPlan,
//        name = "Подтягивания",
//        description = "Это упражнение развивает мышцы спины, бицепсы и предплечья. Выполнять его можно на турнике или специальной перекладине.",
//        exerciseResults = emptyList(),
//        trainingPlan = listsTrainingPlan[0]
//    ),
//    Exercise(
//        idExercise = 4,
//        trainingPlanId = listsTrainingPlan[0].idTrainingPlan,
//        name = "Жим гантелей лежа",
//        description = "Это упражнение предназначено для развития грудных мышц и трицепса. Выполнять его следует на горизонтальной скамье, гантели должны быть подняты до уровня груди.",
//        exerciseResults = emptyList(),
//        trainingPlan = listsTrainingPlan[0]
//    ),
//    Exercise(
//        idExercise = 5,
//        trainingPlanId = listsTrainingPlan[0].idTrainingPlan,
//        name = "Тяга гантелей к поясу",
//        description = "Это упражнение помогает укрепить мышцы спины и бицепсы. Выполняется стоя, гантели поднимаются к поясу.",
//        exerciseResults = emptyList(),
//        trainingPlan = listsTrainingPlan[0]
//    ),
//    Exercise(
//        idExercise = 6,
//        trainingPlanId = listsTrainingPlan[0].idTrainingPlan,
//        name = "Выпады с гантелями",
//        description = "Это упражнение способствует развитию мышц ног и ягодиц. Выполняются выпады вперед и назад, гантели держат в руках.",
//        exerciseResults = emptyList(),
//        trainingPlan = listsTrainingPlan[0]
//    ),
//    Exercise(
//        idExercise = 7,
//        trainingPlanId = listsTrainingPlan[0].idTrainingPlan,
//        name = "Разгибание рук с гантелей из-за головы",
//        description = "Это упражнение направлено на укрепление трицепсов. Выполняется сидя, гантель поднимается над головой.",
//        exerciseResults = emptyList(),
//        trainingPlan = listsTrainingPlan[0]
//    )
//)