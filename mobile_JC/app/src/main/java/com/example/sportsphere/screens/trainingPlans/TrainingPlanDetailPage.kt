package com.example.sportsphere.screens.trainingPlans

import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.AppBarDefaults
import androidx.compose.material.Scaffold
import androidx.compose.material.Text
import androidx.compose.material.TextButton
import androidx.compose.material.TopAppBar
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.Card
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.example.sportsphere.databases.models.Exercise
import com.example.sportsphere.databases.models.TrainingPlan
import java.time.LocalDateTime

@Composable
fun TrainingPlanDetailPage(
    modifier: Modifier = Modifier,
    navController: NavController
) {
    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(text = "Тренировка на 23.11.2023") },
                navigationIcon = {
                    IconButton(onClick = { navController.popBackStack() }) {
                        Icon(
                            imageVector = Icons.Filled.ArrowBack,
                            contentDescription = "Localized description",
                            tint = Color.White
                        )
                    }
                },
            )
        }
    ) {
        TrainingPlanContent(it)
    }
}

@Preview(showBackground = true)
@Composable
fun TrainingPlanContentPreview() {
    TrainingPlanContent(it = PaddingValues(0.dp))
}


@Composable
fun TrainingPlanContent(it: PaddingValues) {
    LazyColumn(
        modifier = Modifier
            .fillMaxWidth()
            .padding(10.dp)
    ) {
        item {
            Text(
                "Описание",
                style = TextStyle(fontSize = 20.sp, fontWeight = FontWeight.Bold)
            )
            Spacer(modifier = Modifier.height(10.dp))
            Text(
                listsTrainingPlan[0].description,
                style = TextStyle(fontSize = 18.sp)
            )
            Spacer(modifier = Modifier.height(10.dp))
            Text(
                "Упражнения",
                modifier = Modifier.fillMaxWidth(),
                style = TextStyle(
                    fontSize = 20.sp,
                    fontWeight = FontWeight.Bold,
                    textAlign = TextAlign.Center
                )
            )
            Spacer(modifier = Modifier.height(10.dp))
        }
        items(listsExercise.size) {
            exerciseItem(listsExercise[it])
        }
    }
}

val listsTrainingPlan: Array<TrainingPlan> = arrayOf(
    TrainingPlan(
        idTrainingPlan = 1,
        title = "Силовой прорыв",
        description = "“Силовой прорыв” - это интенсивная силовая тренировка, предназначенная для быстрого и эффективного развития мышечной массы и силы. Эта тренировка включает в себя различные упражнения с использованием собственного веса тела, гантелей и эспандеров, которые выполняются в несколько раундов и сетов.\n" +
                "\n" +
                "Цель “Силового прорыва” - обеспечить максимальное увеличение силы и мышечной массы за минимальное время. Эта тренировка идеально подходит для тех, кто хочет быстро достичь результатов и улучшить свою физическую форму. Для достижения наилучших результатов важно соблюдать правильную технику выполнения упражнений и регулярно увеличивать вес и количество повторений.",
        startDate = LocalDateTime.now(),
        endDate = LocalDateTime.now(),
        createdAt = LocalDateTime.now(),
        PlanProgress = 0f,
        typeOfSport = emptyList(),
        categories = emptyList(),
        exercises = emptyList(),
        trainingResults = emptyList()
    )
)

val listsExercise: Array<Exercise> = arrayOf(
    Exercise(
        idExercise = 1,
        trainingPlanId = listsTrainingPlan[0].idTrainingPlan,
        name = "Отжимания",
        description = "Это базовое упражнение для развития грудных мышц, трицепсов и дельтовидных мышц. Выполняйте его, опираясь на ладони и носки ног, с прямой спиной.",
        exerciseResults = emptyList(),
        trainingPlan = listsTrainingPlan[0]
    ),
    Exercise(
        idExercise = 1,
        trainingPlanId = listsTrainingPlan[0].idTrainingPlan,
        name = "Приседания",
        description = "Это упражнение укрепляет бедра, ягодицы и спину. Выполняется с прямой спиной, колени не должны выходить за пальцы ног.",
        exerciseResults = emptyList(),
        trainingPlan = listsTrainingPlan[0]
    ),
    Exercise(
        idExercise = 1,
        trainingPlanId = listsTrainingPlan[0].idTrainingPlan,
        name = "Подтягивания",
        description = "Это упражнение развивает мышцы спины, бицепсы и предплечья. Выполнять его можно на турнике или специальной перекладине.",
        exerciseResults = emptyList(),
        trainingPlan = listsTrainingPlan[0]
    ),
    Exercise(
        idExercise = 1,
        trainingPlanId = listsTrainingPlan[0].idTrainingPlan,
        name = "Жим гантелей лежа",
        description = "Это упражнение предназначено для развития грудных мышц и трицепса. Выполнять его следует на горизонтальной скамье, гантели должны быть подняты до уровня груди.",
        exerciseResults = emptyList(),
        trainingPlan = listsTrainingPlan[0]
    ),
    Exercise(
        idExercise = 1,
        trainingPlanId = listsTrainingPlan[0].idTrainingPlan,
        name = "Тяга гантелей к поясу",
        description = "Это упражнение помогает укрепить мышцы спины и бицепсы. Выполняется стоя, гантели поднимаются к поясу.",
        exerciseResults = emptyList(),
        trainingPlan = listsTrainingPlan[0]
    ),
    Exercise(
        idExercise = 1,
        trainingPlanId = listsTrainingPlan[0].idTrainingPlan,
        name = "Выпады с гантелями",
        description = "Это упражнение способствует развитию мышц ног и ягодиц. Выполняются выпады вперед и назад, гантели держат в руках.",
        exerciseResults = emptyList(),
        trainingPlan = listsTrainingPlan[0]
    ),
    Exercise(
        idExercise = 1,
        trainingPlanId = listsTrainingPlan[0].idTrainingPlan,
        name = "Разгибание рук с гантелей из-за головы",
        description = "Это упражнение направлено на укрепление трицепсов. Выполняется сидя, гантель поднимается над головой.",
        exerciseResults = emptyList(),
        trainingPlan = listsTrainingPlan[0]
    )
)

@Composable
fun exerciseItem(exercise: Exercise) {
    val isShow = remember {
        mutableStateOf(false)
    }
    Card(
        modifier = Modifier
            .padding(10.dp)
            .clip(RoundedCornerShape(10.dp))
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .background(Color.White)
                .padding(10.dp)
        ) {
            Text(
                exercise.name,
                style = TextStyle(fontSize = 20.sp, fontWeight = FontWeight.Bold)
            )
            TextButton(
                modifier = Modifier.padding(0.dp),
                onClick = {isShow.value = !isShow.value},
                content = {
                    if (isShow.value) {
                        Text(
                            text = exercise.description,
                            style = TextStyle(fontSize = 18.sp)
                        )
                    } else {
                        Text(
                            text = "Подробнее...",
                            style = TextStyle(fontSize = 18.sp, fontStyle = FontStyle.Italic)
                        )

                    }
                },

                )
        }
    }
}