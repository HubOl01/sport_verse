package com.example.sportsphere.navigations

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.MailOutline
import androidx.compose.material.icons.filled.Person
import androidx.compose.ui.graphics.vector.ImageVector

sealed class BottomBarScreen(
    val route: String,
    val title: String,
    val icon: ImageVector
) {
    object Home : BottomBarScreen(
        route = "HOME",
        title = "Главная",
        icon = Icons.Default.Home
    )

    object TrainingPlans : BottomBarScreen(
        route = "TRAINING_PLANS",
        title = "Тренировочные планы",
        icon = Icons.Default.MailOutline
    )
    object Profile : BottomBarScreen(
        route = "PROFILE",
        title = "Профиль",
        icon = Icons.Default.Person
    )
}
