package com.example.sportsphere.screens.trainingPlans

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
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
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import com.example.sportsphere.R
import com.example.sportsphere.databases.models.TrainingPlan
import com.example.sportsphere.navigations.graphs.Screen

@OptIn(ExperimentalMaterial3Api::class)
//@Preview(showBackground = true)
@Composable
fun TrainingPlansPage(itM: PaddingValues, navController: NavController) {
    Scaffold(
        modifier = Modifier.padding(itM),
        topBar = {
            TopAppBar(title = { Text(text = "План тренировок") }, actions = {
                IconButton(onClick = { navController.navigate(Screen.TrainingPlanAdd.route) }) {
                Icon(painter = painterResource(id = R.drawable.baseline_add_24), contentDescription = null)
            }})
        }
    ) { it ->
        LazyColumn(modifier = Modifier.padding(it)) {
            items(listsTrainingPlan.size) {
                CardPlan(navController, listsTrainingPlan[it])
            }
        }
    }
}

@Composable
fun CardPlan(navController: NavController, trainingPlan: TrainingPlan) {
    Card(modifier = Modifier.padding(10.dp).clip(RoundedCornerShape(10.dp))
        .clickable { navController.navigate(Screen.TrainingPlanDetail.planId(trainingPlan.idTrainingPlan)) },
    ) {
        Column(modifier = Modifier
            .fillMaxWidth()
            .padding(10.dp)) {
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
fun Preview(){
    Card(modifier = Modifier.padding(10.dp).clip(RoundedCornerShape(10.dp))
    ) {
        Column(modifier = Modifier
            .fillMaxWidth().background(Color.White.copy(alpha = .5f))
            .padding(10.dp)) {
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