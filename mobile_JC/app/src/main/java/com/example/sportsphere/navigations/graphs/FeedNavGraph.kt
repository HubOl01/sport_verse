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
        startDestination = DetailsScreen.Info.route
    ) {
        composable(route = DetailsScreen.Info.route,
            arguments = listOf(
                navArgument(KEY_AGG_DETAILS){
                    type= NavType.IntType
                }
            )
            ) {
            DetailPost(it.arguments!!.getInt(KEY_AGG_DETAILS))
        }
    }
}

const val KEY_AGG_DETAILS = "postId"
sealed class DetailsScreen(val route: String) {
    object Info : DetailsScreen(route = "detail_post/${KEY_AGG_DETAILS}"){
        fun postId(id: Int): String{
            return "detail_post/${id}"
        }
    }
}