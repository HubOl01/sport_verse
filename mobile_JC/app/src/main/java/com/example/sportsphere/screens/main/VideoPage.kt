package com.example.sportsphere.screens.main

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
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import coil.compose.AsyncImage
import com.example.sportsphere.ui.theme.GrayImage

@Composable
fun VideoPage(
    modifier: Modifier = Modifier,
) {
    LazyColumn(modifier = Modifier.padding()) {
        items(count = 10) {
            VideoPost()
        }
    }
}

@Preview(name = "VIdeoPage")
@Composable
private fun PreviewVideoPage() {
//    VideoPage(it)
}

@Composable
fun VideoPost() {
    Box(modifier = Modifier.padding(0.dp, 10.dp)) {
        Column {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .aspectRatio(16f / 10f)
                    .background(color = GrayImage)
            )
            Row(modifier = Modifier.padding(10.dp, 5.dp), verticalAlignment = Alignment.CenterVertically) {
                Box(
                    modifier = Modifier
                        .size(38.dp)
                        .clip(CircleShape)
                        .background(color = Color.Blue)
                ) {
                    AsyncImage(
                        "",
                        contentDescription = null,
                        contentScale = ContentScale.Crop,
                        modifier = Modifier.fillMaxSize()
                    )
                }
                Spacer(modifier = Modifier.width(10.dp))
                Text(
                    text = "test",
                    style = TextStyle(fontSize = 16.sp, fontWeight = FontWeight.Bold)
                )

            }
        }
    }
}