package com.example.sportsphere.screens.trainingPlans

import android.app.Application
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Card
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.livedata.observeAsState
import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavController
import com.example.sportsphere.R
import com.example.sportsphere.databases.models.TrainingPlan
import com.example.sportsphere.databases.models.getDateFormaters
import com.example.sportsphere.navigations.graphs.Screen
//import com.example.sportsphere.viewModel.TrainingPlansModel
import com.example.sportsphere.viewModel.TrainingPlansViewModel
import com.example.sportsphere.viewModel.TrainingPlansViewModelFactory
import java.time.LocalDateTime

@OptIn(ExperimentalMaterial3Api::class)
//@Preview(showBackground = true)
@Composable
fun TrainingPlansPage(itM: PaddingValues, navController: NavController) {
//    var listsTrainingPlanner by remember {
//
//    }
    val context = LocalContext.current
    val mTrainingPlanModel: TrainingPlansViewModel = viewModel(
        factory = TrainingPlansViewModelFactory(context.applicationContext as Application)
    )
    val plans = mTrainingPlanModel.readAllData.observeAsState(listOf()).value
    var count by remember {
        mutableStateOf(0)
    }
    Scaffold(
        modifier = Modifier.padding(itM),
        topBar = {
            TopAppBar(title = { Text(text = "План тренировок") }, actions = {
                IconButton(onClick = {
//                    count++
                    navController.navigate(Screen.TrainingPlanAdd.route)
//                    mTrainingPlanModel.addData(
//                        TrainingPlan(
////                            idTrainingPlan = count,
//                            title = "plan ${count}",
//                            description = "",
//                            startDate = getDateFormaters(LocalDateTime.now()),
//                            endDate = getDateFormaters(LocalDateTime.now()),
////                            createdAt = LocalDateTime.now(),
//                            PlanProgress = 1f,
//                        )
//                    )
                }) {
                    Icon(
                        painter = painterResource(id = R.drawable.baseline_add_24),
                        contentDescription = null
                    )
                }
            })
        }
    ) { it ->
//        LazyColumn(modifier = Modifier.padding(it)) {
//                if (listsTrainingPlan.isNotEmpty())
//                    items(listsTrainingPlan.size) {
//                        CardPlan(navController, listsTrainingPlan[it])
//                    }
//                else
//            item {
//                Text(text = "Нет данных", modifier = Modifier.fillMaxSize())
//
//            }
//        }
        LazyColumn(
            modifier = Modifier
                .padding(it)
                .fillMaxSize(),
            horizontalAlignment = if (plans.isEmpty()) Alignment.CenterHorizontally else Alignment.Start,
            verticalArrangement = if (plans.isEmpty()) Arrangement.Center else Arrangement.Top,
        ) {
            when {
                plans.isNotEmpty() -> {
                    items(plans.size) {
                        CardPlan(navController, plans[it])
                    }
                }

                else -> {
                    item {
                        Column(
                            horizontalAlignment = Alignment.CenterHorizontally,
                            verticalArrangement = Arrangement.Center,
                            modifier = Modifier.fillMaxSize()
                        ) {
                            Text(text = "Нет данных")
                        }
                    }
                }
            }

        }

    }
}

@Composable
fun CardPlan(navController: NavController, trainingPlan: TrainingPlan) {
    Card(
        modifier = Modifier
            .padding(10.dp)
            .clip(RoundedCornerShape(10.dp))
            .clickable { navController.navigate(Screen.TrainingPlanDetail.planId(trainingPlan.idTrainingPlan)) },
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(10.dp)
        ) {
            Text(
                trainingPlan.title,
                style = TextStyle(fontSize = 32.sp, fontWeight = FontWeight.Bold)
            )
            Row {
//                ClipText(text = trainingPlan.typeOfSport[0].nameType, color = Color.Red)
//                ClipText(text = trainingPlan.categories[0].nameCategory, color = Color.DarkGray)
            }
        }
    }
}

@Preview
@Composable
fun Preview() {
    Card(
        modifier = Modifier
            .padding(10.dp)
            .clip(RoundedCornerShape(10.dp))
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .background(Color.White.copy(alpha = .5f))
                .padding(10.dp)
        ) {
            Text(
                "Тренировка на 23.11.2023",
                style = TextStyle(fontSize = 32.sp, fontWeight = FontWeight.Bold)
            )
            Row {
                ClipText(text = "Тяжелая атлетика", color = Color.Red)
                ClipText(text = "Силовая", color = Color.DarkGray)
            }
        }
    }
}

@Composable
fun ClipText(text: String, color: Color) {
    Box(
        modifier = Modifier
            .padding(end = 5.dp)
            .clip(RoundedCornerShape(50.dp))
            .background(color = color)
    ) {
        Text(
            text,
            style = TextStyle(color = Color.White, fontSize = 10.sp),
            modifier = Modifier.padding(horizontal = 8.dp, vertical = 3.dp)
        )
    }
}