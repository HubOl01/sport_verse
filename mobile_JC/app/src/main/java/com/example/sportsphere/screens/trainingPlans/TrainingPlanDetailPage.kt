package com.example.sportsphere.screens.trainingPlans

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.slideOutVertically
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
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
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.input.nestedscroll.NestedScrollConnection
import androidx.compose.ui.input.nestedscroll.NestedScrollSource
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
//import com.example.sportsphere.databases.models.Exercise
import com.example.sportsphere.databases.models.TrainingPlan
import java.time.LocalDateTime

@Composable
fun TrainingPlanDetailPage(
    modifier: Modifier = Modifier,
    idTrainingPlan: Int,
    navController: NavController
) {
    val isVisible = rememberSaveable { mutableStateOf(true) }
    val nestedScrollConnection = remember {
        object : NestedScrollConnection {
            override fun onPreScroll(available: Offset, source: NestedScrollSource): Offset {
                // Hide FAB
                if (available.y < -1) {
                    isVisible.value = false
                }

                // Show FAB
                if (available.y > 1) {
                    isVisible.value = true
                }

                return Offset.Zero
            }
        }
    }
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
        },
        floatingActionButton = {
            AnimatedVisibility(
                visible = isVisible.value,
                enter = slideInVertically(initialOffsetY = { it * 2 }),
                exit = slideOutVertically(targetOffsetY = { it * 2 }),
            ) {
                FloatingActionButton(onClick = { /*TODO*/ }, containerColor = Color.LightGray) {
                    Text(
                        "Начать тренировку",
                        Modifier.padding(10.dp),
                        style = TextStyle(fontSize = 16.sp)
                    )
                }
            }
        }
    ) {
        TrainingPlanContent(it, nestedScrollConnection = nestedScrollConnection)
    }
}

@Preview(showBackground = true)
@Composable
private fun TrainingPlanContentPreview() {
//    TrainingPlanContent(it = PaddingValues(0.dp))
}


@Composable
private fun TrainingPlanContent(it: PaddingValues, nestedScrollConnection: NestedScrollConnection) {
    LazyColumn(
        modifier = Modifier
            .fillMaxWidth()
            .nestedScroll(nestedScrollConnection),
    ) {
        item {
            Column(Modifier.padding(10.dp)) {
                Text(
                    "Описание",
                    style = TextStyle(fontSize = 20.sp, fontWeight = FontWeight.Bold)
                )
                Spacer(modifier = Modifier.height(10.dp))
                Text(
//                    listsTrainingPlan[0].description,
                    "",
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
            }
        }
//        items(listsExercise.size) {
//            exerciseItem(listsExercise[it])
//        }
    }
}


//@Composable
//fun exerciseItem(exercise: Exercise) {
//    val isShow = remember {
//        mutableStateOf(false)
//    }
//    Card(
//        modifier = Modifier
//            .padding(10.dp)
//            .clip(RoundedCornerShape(10.dp))
//            .clickable { isShow.value = !isShow.value }
//    ) {
//        Column(
//            modifier = Modifier
//                .fillMaxWidth()
//                .background(Color.White.copy(alpha = .5f))
//                .padding(10.dp)
//        ) {
//            Text(
//                exercise.name,
//                style = TextStyle(fontSize = 20.sp, fontWeight = FontWeight.Bold)
//            )
//            Spacer(modifier = Modifier.height(10.dp))
//            if (isShow.value) {
//                Text(
//                    text = exercise.description,
//                    style = TextStyle(fontSize = 18.sp)
//                )
//            } else {
//                Text(
//                    text = "Подробнее...",
//                    style = TextStyle(
//                        fontSize = 18.sp,
//                        fontStyle = FontStyle.Italic,
//                        color = Color.Gray
//                    )
//                )
//
//            }
//
//
//        }
//    }
//}