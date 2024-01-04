package com.example.sportsphere.navigations.graphs

import TabScreen
import android.util.Log
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.material3.Scaffold
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
import com.example.sportsphere.screens.trainingPlans.TrainingPlanDetailPage
import com.example.sportsphere.screens.trainingPlans.TrainingPlansPage

@Composable
fun HomeNavGraph(navController: NavHostController, itM: PaddingValues) {
    NavHost(
        navController = navController,
        route = Graph.HOME,
        startDestination = BottomBarScreen.Home.route
    ) {
        composable(route = BottomBarScreen.Home.route) {
                TabScreen(navController = navController, itM)
//            FeedPage(navController = navController, itM)
//            Scaffold {
//            }
        }
        composable(route = BottomBarScreen.TrainingPlans.route) {
            TrainingPlansPage(itM, navController)
        }
        composable(route = BottomBarScreen.Profile.route) {
            ProfilePage(navController = navController, itM)
        }
        detailsNavGraph(navController = navController)
        trainingPlanDetailNavGraph(navController)
    }
}

fun NavGraphBuilder.detailsNavGraph(navController: NavHostController) {
    navigation(
        route = Graph.DETAIL,
        startDestination = Screen.DetailPost.route
    ) {
        composable(route = Screen.DetailPost.route,
            arguments = listOf(
                navArgument(KEY_AGG_DETAILS){
                    type= NavType.IntType
//                    defaultValue = 0
                }
            )
            ) {
            DetailPost(it.arguments?.getInt(KEY_AGG_DETAILS)!!.toInt(), navController)
//            Log.d("argAF", it.arguments?.getInt(KEY_AGG_DETAILS).toString())
        }
    }
}
fun NavGraphBuilder.trainingPlanDetailNavGraph(navController: NavHostController) {
    navigation(
        route = Graph.DETAIL,
        startDestination = Screen.TrainingPlanDetail.route
    ) {
        composable(route = Screen.TrainingPlanDetail.route,
        ) {
            TrainingPlanDetailPage(navController = navController)
        }
    }
}

const val KEY_AGG_DETAILS = "postId"
