package com.example.sportsphere.screens.profile

import android.annotation.SuppressLint
import androidx.compose.foundation.Image
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.LazyRow
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.GridItemSpan
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.grid.rememberLazyGridState
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarColors
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import androidx.navigation.compose.rememberNavController
import coil.compose.AsyncImage
import com.example.sportsphere.R
import com.example.sportsphere.navigations.graphs.Screen
import com.example.sportsphere.screens.main.Community
import com.example.sportsphere.screens.main.PostModel
import com.example.sportsphere.screens.main.communities
import com.example.sportsphere.ui.theme.GrayImage
@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProfilePage(navController: NavController) {
    Scaffold(
        topBar = {
            TopAppBar(title = { Text(text = "Профиль") },
                actions = {
                    IconButton(onClick = { /*TODO*/ }) {
                        Icon(
                          Icons.Filled.Menu,
                            "Меню",
//                            tint = Color.White
                        )
                    }
                },
                colors = TopAppBarDefaults.topAppBarColors(
                    containerColor = Color.Transparent
                ))
        }
    ) {
        LazyVerticalGrid(
            columns = GridCells.Fixed(3),
            modifier = Modifier
                .fillMaxSize()
                .padding(it)
        ) {
            item(span = { GridItemSpan(3) }) {
                ProfileHeader(communities[0])
            }

            items(communities[0].posts!!.size) {
                Posts(communities[0].posts!![it], navController)
            }
        }
    }
}

@Composable
fun ProfileHeader(user: Community) {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(10.dp)
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier
                .fillMaxWidth()
                .padding(bottom = 10.dp)
        ) {
            Box(
                modifier = Modifier
                    .size(60.dp)
                    .clip(CircleShape)
                    .background(color = Color.Blue)
            ){
                AsyncImage(user.url_avatar,
                    contentDescription = null,
                    contentScale = ContentScale.Crop,
                    modifier = Modifier.fillMaxSize())
            }
            Spacer(modifier = Modifier.width(10.dp))
            Column {
                Text(text = user.name, style = TextStyle(fontSize = 30.sp, fontWeight = FontWeight.Bold))
                Text(text = user.communityProfile.sport_type!!, style = TextStyle(fontSize = 16.sp))
            }
        }
        ProfileCounts()
        Spacer(modifier = Modifier.height(10.dp))
        Text(text = "Мои публикации", style = TextStyle(fontSize = 20.sp))
    }
}

@Composable
fun Posts(posts: PostModel, navController: NavController){
    Box(
        modifier = Modifier
            .fillMaxSize()
            .padding(4.dp)
            .aspectRatio(1f / 1f)
            .clip(RoundedCornerShape(10))
            .background(color = GrayImage)
            .clickable {
                navController.navigate(Screen.Detail.passId(posts.idPost))
            },
    ) {
        AsyncImage(posts.photos!!.first().url_image,
            contentDescription = null,
            contentScale = ContentScale.Crop,
            modifier = Modifier.fillMaxSize())

    }
}

@Preview
@Composable
fun ProfileCounts(){
    Row(modifier = Modifier.fillMaxWidth(), horizontalArrangement = Arrangement.SpaceEvenly) {
        ColumnCounter(100, "подписки")
        ColumnCounter(66, "подписчики")
        ColumnCounter(100, "лайки")

    }
}

@Composable
fun ColumnCounter(count: Int, title: String){
    Column(horizontalAlignment = Alignment.CenterHorizontally) {
        Text(text = count.toString(), style = TextStyle(fontSize = 30.sp, fontWeight = FontWeight.Bold))
        Text(text = title)
    }
}