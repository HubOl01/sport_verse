package com.example.sportsphere.screens.trainingPlans

import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.slideOutVertically
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
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
import androidx.compose.material.TextField
import androidx.compose.material.TextFieldDefaults
import androidx.compose.material.TopAppBar
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.rounded.Add
import androidx.compose.material3.Card
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.runtime.Composable
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.input.nestedscroll.NestedScrollConnection
import androidx.compose.ui.input.nestedscroll.NestedScrollSource
import androidx.compose.ui.input.nestedscroll.nestedScroll
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.example.sportsphere.R
import com.example.sportsphere.databases.models.Exercise
import com.example.sportsphere.databases.models.TrainingPlan
import java.time.LocalDateTime

@Composable
fun TrainingPlanAddPage(
    modifier: Modifier = Modifier,
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
                title = { Text(text = "Создание тренировочного плана") },
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
                        "Сохранить",
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
    var titleText by remember {
        mutableStateOf(TextFieldValue(""))
    }
    var descriptionText by remember {
        mutableStateOf(TextFieldValue(""))
    }
    LazyColumn(
        modifier = Modifier
            .fillMaxWidth()
            .nestedScroll(nestedScrollConnection),
    ) {
        item {
            Column(Modifier.padding(10.dp)) {
                OutlinedTextField(
                    modifier = Modifier.fillMaxWidth(),
                    value = titleText,
                    onValueChange = { newText -> titleText = newText },
                    label = { Text("Название тренировки") },
                    maxLines = 1
                )
                OutlinedTextField(
                    modifier = Modifier.fillMaxWidth(),
                    value = descriptionText,
                    onValueChange = { newText -> descriptionText = newText },
                    label = { Text("Описание тренировки") },
                    maxLines = 10
                )
//                Text(
//                    "Описание",
//                    style = TextStyle(fontSize = 20.sp, fontWeight = FontWeight.Bold)
//                )
//                Spacer(modifier = Modifier.height(10.dp))
//                Text(
//                    listsTrainingPlan[0].description,
//                    style = TextStyle(fontSize = 18.sp)
//                )
                Spacer(modifier = Modifier.height(10.dp))
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    verticalAlignment = Alignment.CenterVertically,
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    Text(
                        "Упражнения",
                        modifier = Modifier,
                        style = TextStyle(
                            fontSize = 20.sp,
                            fontWeight = FontWeight.Bold,
                            textAlign = TextAlign.Center
                        )
                    )
                    IconButton(onClick = { /*TODO*/ }) {
                        Icon(
                            Icons.Rounded.Add,
                            contentDescription = Icons.Rounded.Add.name
                        )
                    }
                }
            }
        }
//        items(listsExercise.size) {
//            exerciseItem(listsExercise[it])
//        }
    }
}