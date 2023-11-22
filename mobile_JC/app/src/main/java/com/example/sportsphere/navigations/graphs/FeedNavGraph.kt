package com.example.sportsphere.navigations.graphs

import androidx.compose.runtime.Composable
import androidx.navigation.NavGraphBuilder
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.navigation
import androidx.navigation.navArgument
import com.example.sportsphere.navigations.BottomBarScreen
import com.example.sportsphere.screens.main.DetailPost
import com.example.sportsphere.screens.main.FeedPage
import com.example.sportsphere.screens.main.PostModel
import com.example.sportsphere.screens.main.dataPosts
import com.example.sportsphere.screens.profile.ProfilePage
import com.example.sportsphere.screens.trainingPlans.TrainingPlansPage

@Composable
fun HomeNavGraph(navController: NavHostController) {
    NavHost(
        navController = navController,
        route = Graph.HOME,
        startDestination = BottomBarScreen.Home.route
    ) {
        composable(route = BottomBarScreen.Home.route) {
            FeedPage(navController = navController)
        }
        composable(route = BottomBarScreen.TrainingPlans.route) {
            TrainingPlansPage()
        }
        composable(route = BottomBarScreen.Profile.route) {
            ProfilePage()
        }
        detailsNavGraph(navController = navController)
    }
}

fun NavGraphBuilder.detailsNavGraph(navController: NavHostController) {
    navigation(
        route = Graph.DETAILS,
        startDestination = DetailsScreen.Information.route
    ) {
        composable(route = DetailsScreen.Information.route + "/{name}",
            arguments = listOf(
                navArgument("post"){
                    type= NavType.IntType
                    defaultValue = 0
                    nullable = true
                }
            )
            ) {
            DetailPost(it.arguments.getInt("name"))
        }
    }
}

val KEY_AGG_DETAILS: String = "name"
sealed class DetailsScreen(val route: String) {
    object Information : DetailsScreen(route = "INFORMATION")
}