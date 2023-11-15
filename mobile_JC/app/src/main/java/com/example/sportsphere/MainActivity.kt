package com.example.sportsphere

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxHeight
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Favorite
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material.icons.filled.MoreVert
import androidx.compose.material.icons.filled.Search
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.BottomAppBar
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Shapes
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarColors
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.material3.contentColorFor
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavDestination.Companion.hierarchy
import androidx.navigation.NavGraph.Companion.findStartDestination
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.example.sportsphere.screens.profile.ProfilePage
import com.example.sportsphere.screens.trainingPlans.TrainingPlansPage
import com.example.sportsphere.ui.theme.GrayImage
import com.example.sportsphere.ui.theme.GrayPost
import com.example.sportsphere.ui.theme.SportSphereTheme
import com.google.android.engage.social.datamodel.Profile

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            SportSphereTheme {
                // A surface container using the 'background' color from the theme
                Surface(
                    modifier = Modifier.fillMaxSize(),
                    color = MaterialTheme.colorScheme.background
                ) {
                    MainPage()
                }
            }
        }
    }
}

enum class Screens {
    TrainingPlansPage,
    ProfilePage
}

data class NavItem(
    val label: String,
    val icon: ImageVector,
    val route: String
)

val listOfNavItem = listOf(
    NavItem("TrainingPlans", Icons.Default.Home, Screens.TrainingPlansPage.name),
    NavItem("Profile", Icons.Default.Settings, Screens.ProfilePage.name)
)

@OptIn(ExperimentalMaterial3Api::class)
//@Preview(showBackground = true)
@Composable
fun MainPage() {
    val navController = rememberNavController()
    Scaffold(
        bottomBar = {
            NavigationBar {
                val navBackStackEntry by navController.currentBackStackEntryAsState()
                val currentDestination = navBackStackEntry?.destination
                listOfNavItem.forEach { screen ->
                    NavigationBarItem(
                        icon = { Icon(imageVector = screen.icon, contentDescription = null) },
                        label = { Text(screen.label) },
                        selected = currentDestination?.hierarchy?.any { it.route == screen.route } == true,
                        onClick = {
                            navController.navigate(screen.route) {
                                popUpTo(navController.graph.findStartDestination().id) {
                                    saveState = true
                                }
                                launchSingleTop = true
                                restoreState = true
                            }
                        }
                    )
                }
            }
        }
    ) { innerPadding ->
        NavHost(
            navController,
            startDestination = Screens.TrainingPlansPage.name,
            Modifier.padding(innerPadding)
        ) {
            composable(Screens.TrainingPlansPage.name) { TrainingPlansPage() }
            composable(Screens.ProfilePage.name) { ProfilePage() }
        }
    }
}

@Composable
fun Stories(it: PaddingValues) {
    LazyRow(

        Modifier
            .padding(it)
            .fillMaxWidth(),
    ) {
        items(6) {
            Card(
                modifier = Modifier
                    .height(150.dp)
                    .width(100.dp)
                    .padding(top = 10.dp, bottom = 10.dp, start = 10.dp),
                colors = CardDefaults.cardColors(
                    containerColor = Color.Red
                )
            ) {

            }
        }
    }
}

//@Preview(showBackground = true)
@Composable
fun Post() {
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .background(color = GrayPost)
    ) {
        Column(modifier = Modifier.fillMaxWidth()) {
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(10.dp),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                Row(
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(38.dp)
                            .clip(CircleShape)
                            .background(color = Color.Blue)
                    )
                    Box(modifier = Modifier.width(10.dp))
                    Column {
                        Text(text = "User1", style = TextStyle(fontSize = 16.sp))
                        Text(text = "Football", style = TextStyle(fontSize = 14.sp))
                    }
                }
                IconButton(onClick = { }, modifier = Modifier.padding(0.dp)) {
                    Icon(
                        painter = painterResource(id = R.drawable.baseline_more_horiz_24),
                        contentDescription = "menu"
                    )
                }
            }
            Box {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .aspectRatio(4f / 4f)
                        .background(color = GrayImage)
                ) {
                    Image(
                        painter = painterResource(id = R.drawable.image_for_post),
                        contentDescription = "Матч",
                        contentScale = ContentScale.Crop,
                        modifier = Modifier.fillMaxSize()
                    )
                    Text(
                        text = """Сегодня на чемпионате мира по футболу состоится долгожданный матч между командами Франции и Аргентины. Обе команды являются одними из фаворитов турнира, и их встреча обещает быть захватывающей.
 
 Игроки Франции, ведомые Килианом Мбаппе, находятся в отличной форме и имеют в своем активе несколько ярких побед на этом чемпионате. Аргентина, в свою очередь, также демонстрирует уверенную игру и высокий уровень мастерства.
 
 Ожидается, что этот матч станет одним из самых ярких событий турнира и определит лидера в группе. Болеем за наших и желаем удачи""".prependIndent(),
                        modifier = Modifier
                            .padding(horizontal = 8.dp, vertical = 10.dp)
                            .align(Alignment.BottomStart),
                        style = TextStyle(fontSize = 20.sp, color = Color.White),
                        maxLines = 3,
                        overflow = TextOverflow.Ellipsis
                    )
                }
            }
            Row(
                modifier = Modifier
                    .fillMaxWidth(),
//                    .padding(start = 10.dp, end = 10.dp, top = 8.dp, bottom = 8.dp),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Row() {
                    IconButton(onClick = { }) {
                        Icon(
                            painter = painterResource(id = R.drawable.baseline_favorite_border_24),
                            contentDescription = "like"
                        )

                    }
                    Box(modifier = Modifier.width(10.dp))
                    IconButton(onClick = { }) {
                        Icon(
                            painter = painterResource(id = R.drawable.baseline_comment_24),
                            contentDescription = "comment"
                        )
                    }
                }
                IconButton(onClick = { }) {
                    Icon(
                        painter = painterResource(id = R.drawable.baseline_bookmark_border_24),
                        contentDescription = "bookmark"
                    )
                }
            }
        }
    }
}