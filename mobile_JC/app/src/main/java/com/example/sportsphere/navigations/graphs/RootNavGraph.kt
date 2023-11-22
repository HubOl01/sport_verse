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
    const val ROOT = "root_graph"
//    const val AUTHENTICATION = "auth_graph"
    const val HOME = "feed_graph"
    const val DETAILS = "detail_post"
}