package com.example.sportsphere.navigations.graphs

import androidx.compose.runtime.Composable
import androidx.navigation.NavHostController
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import com.example.sportsphere.MainPage
import com.example.sportsphere.screens.main.FeedPage

@Composable
fun RootNavigationGraph(navController: NavHostController) {
    NavHost(
        navController = navController,
        route = Graph.ROOT,
        startDestination = Graph.HOME
    ) {
        composable(route = Graph.HOME) {
            MainPage()
        }
        detailsNavGraph(navController)
    }
}

object Graph {
    const val ROOT = "root"
//    const val AUTHENTICATION = "auth_graph"
    const val HOME = "home"
    const val DETAIL = "detail"
}

sealed class Screen(val route: String) {
    object Home : Screen(route = "home_screen")
    object Detail : Screen(route = "detail_screen?${KEY_AGG_DETAILS}={${KEY_AGG_DETAILS}}") {
        fun passId(
            id: Int,
        ): String {
            return "detail_screen?$KEY_AGG_DETAILS=$id"
        }
    }
    object Login: Screen(route = "login_screen")
    object SignUp: Screen(route = "sign_up_screen")
}