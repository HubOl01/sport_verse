package com.example.sportsphere.screens.main

import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.Text
import androidx.compose.material.TopAppBar
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.ButtonDefaults
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
import androidx.compose.ui.tooling.preview.Preview
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
fun DetailPost(
id: Int,
navController: NavController
) {
    Scaffold(
        topBar = { TopAppBar(title = { Text(text = "Подробнее") },
                navigationIcon = {
            IconButton(onClick = { navController.popBackStack() }) {
                Icon(
                    imageVector = Icons.Filled.ArrowBack,
                    contentDescription = "Localized description",
                    tint = Color.White
                )
            }
        },) }
    ) { it ->
    Column(modifier = Modifier.padding(it)) {
        DetalPostContent(dataPosts[id])
    }
    }
}

//@Preview(showBackground = true)
//@Composable
//private fun PreviewDetailPost() {
//    DetailPost(post = dataPosts[0])
//}

@Composable
fun DetalPostContent(post: PostModel) {
    val like = remember { mutableStateOf(false) }
    val colorStops= arrayOf(
        .001f to Color.Transparent,
        .4f to Color.Black.copy(alpha = .6f)
    )
    Box(
        modifier = Modifier
            .fillMaxWidth()
    ) {
        LazyColumn(modifier = Modifier.fillMaxWidth()) {
            item {


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
                        ) {
                            AsyncImage(
                                post.communityId!!.url_avatar,
                                contentDescription = null,
                                contentScale = ContentScale.Crop,
                                modifier = Modifier.fillMaxSize()
                            )
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
                        modifier = if (post.photos.isNullOrEmpty()) Modifier
                            .fillMaxWidth() else Modifier
                            .fillMaxWidth()
                            .aspectRatio(4f / 4f)
                            .background(color = GrayImage)
                    ) {
                        if (!post.photos.isNullOrEmpty()) AsyncImage(
                            post.photos.first().url_image,
                            contentDescription = null,
                            contentScale = ContentScale.Crop,
                            modifier = Modifier.fillMaxSize()
                        )
                    }
                }

                Column {
                    if (post.title != null.toString() && post.title != "") Text(
                        text = post.title,
                        modifier = Modifier
                            .padding(horizontal = 8.dp, vertical = 10.dp),
                        style = TextStyle(
                            fontSize = 20.sp,
//                        color = Color.White,
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
//                    maxLines = 10,
//                    overflow = TextOverflow.Ellipsis
                    )
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
//                if(post.photos.isNullOrEmpty())

//                else Text(
//                    text = if(post.title != null.toString() && post.title != "") post.title else post.description!!,
//                    modifier = Modifier
//                        .background(
//                            Brush.verticalGradient(colorStops = colorStops)
//                        )
//                        .padding(start = 8.dp, end = 8.dp, top = 50.dp, bottom = 10.dp),
//                    style = TextStyle(
////                        fontSize = 20.sp,
////                        color = Color.White,
////                        fontWeight = FontWeight.Bold
//                    ),
//                    maxLines = 5,
//                    overflow = TextOverflow.Ellipsis
//                )
                }
            }
        }
    }

}