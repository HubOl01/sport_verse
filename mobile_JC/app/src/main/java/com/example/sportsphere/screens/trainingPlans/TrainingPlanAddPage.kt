package com.example.sportsphere.screens.trainingPlans

import android.annotation.SuppressLint
import android.app.Application
import android.util.Log
import androidx.compose.animation.AnimatedVisibility
import androidx.compose.animation.slideInVertically
import androidx.compose.animation.slideOutVertically
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.Scaffold
import androidx.compose.material.Text
import androidx.compose.material.TopAppBar
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material.icons.rounded.Add
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.ModalBottomSheet
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.rememberModalBottomSheetState
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.runtime.mutableIntStateOf
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
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
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.TextFieldValue
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import com.example.sportsphere.R
import com.example.sportsphere.components.MultiToggleButton
import com.example.sportsphere.databases.models.Exercise
import com.example.sportsphere.viewModel.ExercisesViewModel
import com.example.sportsphere.viewModel.ExercisesViewModelFactory

@Composable
fun TrainingPlanAddPage(
    modifier: Modifier = Modifier, navController: NavController
) {
    val isVisible = rememberSaveable { mutableStateOf(true) }
    val listExercise by remember {
        mutableStateOf(listsExercise)
    }
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

    val context = LocalContext.current
    val mExerciseModel: ExercisesViewModel = viewModel(
        factory = ExercisesViewModelFactory(context.applicationContext as Application)
    )
    val exercises = mExerciseModel.readAllData.observeAsState(listOf()).value
    Scaffold(topBar = {
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
    }, floatingActionButton = {
        AnimatedVisibility(
            visible = isVisible.value,
            enter = slideInVertically(initialOffsetY = { it * 2 }),
            exit = slideOutVertically(targetOffsetY = { it * 2 }),
        ) {
            FloatingActionButton(onClick = {
//                    mExerciseModel.addData(
//
//                    )
            }, containerColor = Color.LightGray) {
                Text(
                    "Сохранить", Modifier.padding(10.dp), style = TextStyle(fontSize = 16.sp)
                )
            }
        }
    }) {
        TrainingPlanContent(it, nestedScrollConnection = nestedScrollConnection)
    }
}

@Preview(showBackground = true)
@Composable
private fun TrainingPlanContentPreview() {
//    TrainingPlanContent(it = PaddingValues(0.dp))
}

@SuppressLint("MutableCollectionMutableState")
@OptIn(ExperimentalMaterial3Api::class)
@Composable
private fun TrainingPlanContent(it: PaddingValues, nestedScrollConnection: NestedScrollConnection) {
    var titleText by remember {
        mutableStateOf(TextFieldValue(""))
    }
    var descriptionText by remember {
        mutableStateOf(TextFieldValue(""))
    }
    var titleExerciseText by remember {
        mutableStateOf(TextFieldValue(""))
    }
    var descriptionExerciseText by remember {
        mutableStateOf(TextFieldValue(""))
    }
    var distanceText by remember {
        mutableStateOf(TextFieldValue(""))
    }
    var timeText by remember {
        mutableStateOf(TextFieldValue(""))
    }
    var countText by remember {
        mutableStateOf(TextFieldValue(""))
    }
    val sheetState = rememberModalBottomSheetState()
    val scope = rememberCoroutineScope()
    var showBottomSheet by remember { mutableStateOf(false) }
    var select by remember {
        mutableIntStateOf(0)
    }

    val listExercise = remember {
        mutableListOf<Exercise>()
    }

    var countId by remember {
        mutableIntStateOf(0)
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
                        "Упражнения", modifier = Modifier, style = TextStyle(
                            fontSize = 20.sp,
                            fontWeight = FontWeight.Bold,
                            textAlign = TextAlign.Center
                        )
                    )
                    IconButton(onClick = {
//                        showBottomSheet = true
                        listExercise.add(
                            Exercise(
                                idExercise = countId,
                                trainingPlanId = 1,
                                name = "${countId} : fasdf",
                                description = descriptionExerciseText.text,
                                distance = distanceText.text.toFloatOrNull(),
                                duration = timeText.text.toLongOrNull(),
                                resultsNumber = countText.text.toFloatOrNull(),
                            )
                        )
                        countId++
                        Log.d("list_Test", listExercise.last().idExercise.toString() + ": " + listExercise.last().name)
                    }) {
                        Icon(
                            Icons.Rounded.Add, contentDescription = Icons.Rounded.Add.name
                        )
                    }
                }
                if (showBottomSheet) {
                    ModalBottomSheet(
                        onDismissRequest = {
                            showBottomSheet = false
                        }, sheetState = sheetState
                    ) {
                        Column(
                            modifier = Modifier.padding(
                                bottom = 30.dp, start = 10.dp, end = 10.dp
                            )
                        ) {
                            OutlinedTextField(
                                modifier = Modifier.fillMaxWidth(),
                                value = titleExerciseText,
                                onValueChange = { newText -> titleExerciseText = newText },
                                label = { Text("Название тренировки") },
                                maxLines = 1
                            )
                            OutlinedTextField(
                                modifier = Modifier.fillMaxWidth(),
                                value = descriptionExerciseText,
                                onValueChange = { newText -> descriptionExerciseText = newText },
                                label = { Text("Описание тренировки") },
                                maxLines = 10
                            )
                            Spacer(modifier = Modifier.height(10.dp))
                            MultiToggleButton(currentSelection = select,
                                toggleStates = listOf("Дистанция", "Время", "Количество"),
                                onToggleChange = { i -> select = i })

                            OutlinedTextField(modifier = Modifier.fillMaxWidth(),
                                value = when (select) {
                                    0 -> distanceText
                                    1 -> timeText
                                    2 -> countText
                                    else -> distanceText
                                },
                                onValueChange = { newText ->
                                    when (select) {
                                        0 -> distanceText = newText
                                        1 -> timeText = newText
                                        2 -> countText = newText
                                        else -> distanceText = newText
                                    }
                                },
                                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                                label = {
                                    Text(
                                        text = when (select) {
                                            0 -> "Введите дистанцию (м)"
                                            1 -> "Введите время в сек"
                                            2 -> "Введите кол-во"
                                            else -> ""
                                        }
                                    )
                                })
                            Spacer(modifier = Modifier.height(10.dp))
                            Button(shape = RoundedCornerShape(10.dp),
                                modifier = Modifier
                                    .fillMaxWidth()
                                    .height(50.dp),
                                colors = androidx.compose.material3.ButtonDefaults.buttonColors(
                                    containerColor = Color(0xFF9e00ff)
                                ),
                                onClick = {
//                                    listExercise.add(
//                                        Exercise(
//                                            idExercise = countId,
//                                            trainingPlanId = 1,
//                                            name = titleExerciseText.text,
//                                            description = descriptionExerciseText.text,
//                                            distance = distanceText.text.toFloatOrNull(),
//                                            duration = timeText.text.toLongOrNull(),
//                                            resultsNumber = countText.text.toFloatOrNull(),
//                                        )
//                                    )
                                    countId++
                                        Log.d("list_Test", listExercise.last().idExercise.toString() + ": " + listExercise.last().name)
                                }) {
                                Text("Сохранить", color = Color.White)
                            }
                        }
                    }
                }
            }
        }
        items(listExercise.size) {
            Text(text = listExercise[it].name, style = TextStyle(Color.Black) )
//            ExerciseItem(listExercise[it])
        }
    }
}

@Composable
fun ExerciseItem(exercise: Exercise) {
    Row(modifier = Modifier.fillMaxWidth(), verticalAlignment = Alignment.CenterVertically, horizontalArrangement = Arrangement.SpaceBetween) {
        Column(
            Modifier
                .padding(vertical = 5.dp, horizontal = 10.dp)
                .fillMaxWidth()
                .clip(RoundedCornerShape(10.dp))
                .background(Color.LightGray)
                .padding(10.dp)
        ) {
            Text(exercise.name, style = TextStyle(fontSize = 18.sp, fontWeight = FontWeight.Bold))
            Spacer(modifier = Modifier.height(10.dp))
            Text("Описание:", style = TextStyle(fontStyle = FontStyle.Italic, color = Color.Gray))
            Spacer(modifier = Modifier.height(10.dp))
            Text(
                exercise.description,
                style = TextStyle(color = Color.Gray),
                maxLines = 1,
                overflow = TextOverflow.Ellipsis
            )

        }
        Icon(
            modifier = Modifier.background(Color.DarkGray),
            painter = painterResource(id = R.drawable.baseline_drag_indicator_24),
            contentDescription = "drag"
        )
    }
}


@Preview(showBackground = false)
@Composable
fun exerciseItemPreview() {
    ExerciseItem(
        Exercise(
            trainingPlanId = 1,
            name = "Бег",
            description = "Сделать темповый бег на 1000м",
            distance = 1000f,
//            duration = "timeText.text.toLongOrNull()",
//            resultsNumber =,
        )
    )
}

fun convertDistance(dtw: String): String{
    if (dtw.contains("km", ignoreCase = true)){
        dtw.replace("km", "")
    }
    if(dtw.contains("км", ignoreCase = true)){
        dtw.replace("км", "")
    }
    if (dtw.contains("m", ignoreCase = true)){
        dtw.replace("m", "")
    }
    if(dtw.contains("м", ignoreCase = true)){
        dtw.replace("м", "")
    }
    return dtw
}
fun convertTime(dtw: String): String{
    if (dtw.contains("s", ignoreCase = true)){
        dtw.replace("s", "")
    }
    if(dtw.contains("с", ignoreCase = true)){
        dtw.replace("с", "")
    }
    if (dtw.contains("m", ignoreCase = true)){
        dtw.replace("m", "")
    }
    if (dtw.contains("м", ignoreCase = true)){
        dtw.replace("м", "")
    }
    if(dtw.contains("h", ignoreCase = true)){
        dtw.replace("h", "")
    }
    if (dtw.contains("ч", ignoreCase = true)){
        dtw.replace("ч", "")
    }
    if(dtw.contains("h", ignoreCase = true)){
        dtw.replace("h", "")
    }
    return dtw
}
fun convertWeight(dtw: String): String{
    if (dtw.contains("kg", ignoreCase = true)){
        dtw.replace("kg", "")
    }
    if (dtw.contains("g", ignoreCase = true)){
        dtw.replace("g", "")
    }
    if (dtw.contains("кг", ignoreCase = true)){
        dtw.replace("кг", "")
    }
    if (dtw.contains("г", ignoreCase = true)){
        dtw.replace("г", "")
    }
    if(dtw.contains("gm", ignoreCase = true)){
        dtw.replace("gm", "")
    }
    return dtw
}