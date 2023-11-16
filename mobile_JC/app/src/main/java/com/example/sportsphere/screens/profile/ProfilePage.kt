package com.example.sportsphere.screens.profile

import androidx.compose.foundation.Image
import androidx.compose.foundation.background
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
import androidx.compose.material3.Text
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
import com.example.sportsphere.R
import com.example.sportsphere.ui.theme.GrayImage

//@Composable
//fun ProfilePage() {
//    Column(
//        modifier = Modifier
//            .fillMaxSize()
//    ) {
//        Column(modifier = Modifier.padding(start = 10.dp, end = 10.dp, top = 10.dp)) {
//            Row(verticalAlignment = Alignment.CenterVertically) {
//                Box(
//                    modifier = Modifier
//                        .size(60.dp)
//                        .clip(CircleShape)
//                        .background(color = Color.Blue)
//                )
//                Box(modifier = Modifier.width(10.dp))
//                Column {
//                    Text(text = "User1", style = TextStyle(fontSize = 24.sp))
//                    Text(text = "Football", style = TextStyle(fontSize = 16.sp))
//                }
//            }
//            Box(modifier = Modifier.height(10.dp))
//            Text(text = "Мои публикации", style = TextStyle(fontSize = 20.sp))
//            Box(modifier = Modifier.height(10.dp))
//        }
//        LazyVerticalGrid(
//            columns = GridCells.Fixed(3),
//            modifier = Modifier
//                .fillMaxSize()
//        ) {
//            items(60) { index ->
//                Box(
//                    modifier = Modifier
//                        .fillMaxSize()
//                        .padding(4.dp)
//                        .aspectRatio(1f / 1f)
//                        .clip(RoundedCornerShape(10))
//                        .background(color = GrayImage),
//                ) {
//                    Image(
//                        painter = painterResource(id = R.drawable.image_for_post),
//                        contentDescription = null,
//                        modifier = Modifier
//                            .fillMaxSize(),
//                        contentScale = ContentScale.Crop
//                    )
//
//                }
//            }
//        }
//    }
//}

@Composable
fun ProfilePage() {
    LazyVerticalGrid(
        columns = GridCells.Fixed(3),
        modifier = Modifier
            .fillMaxSize()
            .padding(horizontal = 4.dp)
    ) {
        item(span = {GridItemSpan(3)}) {
            ProfileHeader()
        }

        items(60) {
            Posts()
        }
    }
}

@Composable
fun ProfileHeader() {
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
            )
            Spacer(modifier = Modifier.width(10.dp))
            Column {
                Text(text = "User1", style = TextStyle(fontSize = 30.sp, fontWeight = FontWeight.Bold))
                Text(text = "Football", style = TextStyle(fontSize = 16.sp))
            }
        }
        ProfileCounts()
        Spacer(modifier = Modifier.height(10.dp))
        Text(text = "Мои публикации", style = TextStyle(fontSize = 20.sp))
    }
}

@Composable
fun Posts(){
    Box(
        modifier = Modifier
            .fillMaxSize()
            .padding(4.dp)
            .aspectRatio(1f / 1f)
            .clip(RoundedCornerShape(10))
            .background(color = GrayImage),
    ) {
        Image(
            painter = painterResource(id = R.drawable.image_for_post),
            contentDescription = null,
            modifier = Modifier
                .fillMaxSize(),
            contentScale = ContentScale.Crop
        )

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