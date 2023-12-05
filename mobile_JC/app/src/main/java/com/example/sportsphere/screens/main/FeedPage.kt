package com.example.sportsphere.screens.main

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
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.Text
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Scaffold
import androidx.compose.material3.TextButton
import androidx.compose.runtime.Composable
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import coil.compose.AsyncImage
import com.example.sportsphere.R
import com.example.sportsphere.navigations.graphs.Graph
import com.example.sportsphere.navigations.graphs.Screen
import com.example.sportsphere.ui.theme.GrayImage
import com.example.sportsphere.ui.theme.GrayPost

@Composable
fun FeedPage(navController: NavController) {
        LazyColumn(modifier = Modifier.fillMaxSize().padding()) {
            item {
                Stories()
            }
            items(dataPosts.size) {
                Post(dataPosts[it], navController!!, it)
                Spacer(modifier = Modifier.height(10.dp))
            }
        }
    }


@Composable
fun Stories() {
    LazyRow(
        Modifier
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

@Composable
fun Post(post: PostModel, navController: NavController, index:Int) {
    val like = remember { mutableStateOf(false) }
    val colorStops= arrayOf(
        .001f to Color.Transparent,
        .4f to Color.Black.copy(alpha = .6f)
    )
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .background(color = GrayPost)
            .clickable {
                navController.navigate(Screen.Detail.passId(post.idPost))
            }
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
                    ){
                        AsyncImage(post.communityId!!.url_avatar,
                            contentDescription = null,
                            contentScale = ContentScale.Crop,
                            modifier = Modifier.fillMaxSize())
                    }
                    Spacer(modifier = Modifier.width(10.dp))
                    Column {
                        androidx.compose.material3.Text(
                            text = post.communityId!!.name,
                            style = TextStyle(fontSize = 16.sp, fontWeight = FontWeight.Bold)
                        )
                        androidx.compose.material3.Text(
                            text = post.communityId.communityProfile.sport_type!!,
                            style = TextStyle(fontSize = 14.sp)
                        )
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
                    modifier = if(post.photos.isNullOrEmpty()) Modifier
                        .fillMaxWidth() else Modifier
                        .fillMaxWidth()
                        .aspectRatio(4f / 4f)
                        .background(color = GrayImage)
                ) {
                    if(!post.photos.isNullOrEmpty()) AsyncImage(
                        post.photos.first().url_image,
                        contentDescription = null,
                        contentScale = ContentScale.Crop,
                        modifier = Modifier.fillMaxSize()
                    )
                    if(post.photos.isNullOrEmpty())
                        Column {
                            if(post.title != null.toString() && post.title != "") Text(
                                text = post.title,
                                modifier = Modifier
                                    .padding(horizontal = 8.dp, vertical = 10.dp),
                                style = TextStyle(
                                    fontSize = 20.sp,
                                    color = Color.White,
                                    fontWeight = FontWeight.Bold
                                ),
                            )
                            Text(
                                text = post.description!!,
                                modifier = Modifier
                                    .padding(horizontal = 8.dp, vertical = 10.dp),
                                style = TextStyle(
                                    fontSize = 16.sp,
                                    color = Color.Black,
                                ),
                                maxLines = 10,
                                overflow = TextOverflow.Ellipsis
                            )
                        }
                        else Text(
                        text = if(post.title != null.toString() && post.title != "") post.title else post.description!!,
                        modifier = Modifier
                            .background(
                                Brush.verticalGradient(colorStops = colorStops)
                            )
                            .padding(start = 8.dp, end = 8.dp, top = 50.dp, bottom = 10.dp)
                            .align(Alignment.BottomStart),
                        style = TextStyle(
                            fontSize = 20.sp,
                            color = Color.White,
                            fontWeight = FontWeight.Bold
                        ),
                        maxLines = 5,
                        overflow = TextOverflow.Ellipsis
                    )
                }
            }
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(10.dp, 0.dp),
//                    .padding(start = 10.dp, end = 10.dp, top = 8.dp, bottom = 8.dp),
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                IconButton(onClick = { }) {
                    Icon(
                        painter = painterResource(id = R.drawable.baseline_bookmark_border_24),
                        contentDescription = "bookmark"
                    )
                }
                Row(verticalAlignment = Alignment.CenterVertically,) {
                    IconButton(onClick = { }) {
                        Icon(
                            painter = painterResource(id = R.drawable.baseline_comment_24),
                            contentDescription = "comment"
                        )
                    }
                    Spacer(modifier = Modifier.width(5.dp))
                        TextButton(
                            onClick = { like.value = !like.value },
                            colors = ButtonDefaults.buttonColors(
                                contentColor = Color.Black,
                                containerColor = Color.Transparent
                            )
                        ) {
                            Row(
                                verticalAlignment = Alignment.CenterVertically,
                                horizontalArrangement = Arrangement.spacedBy(5.dp),
                            ) {
                                Icon(
                                    painter = painterResource(id = if (!like.value) R.drawable.baseline_favorite_border_24 else R.drawable.baseline_favorite_24),
                                    contentDescription = "like",
                                    tint = if (like.value) Color.Red else Color.Black
                                )
                                Text(
                                    text = formatLikes(post.likes),
                                    style = TextStyle(fontWeight = FontWeight.Bold),
                                    maxLines = 1,
                                )
                            }
                    }
                }
            }
        }
    }

}
fun formatLikes(likes: Long): String {
    return when {
        likes < 1000 -> likes.toString()
        likes < 1000000 -> "${likes / 1000}k"
        else -> "${likes / 1000000}M"
    }
}