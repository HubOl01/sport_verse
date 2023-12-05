package com.example.sportsphere.screens.main

import android.widget.GridView
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.aspectRatio
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.wrapContentHeight
import androidx.compose.foundation.lazy.grid.GridCells
import androidx.compose.foundation.lazy.grid.GridItemSpan
import androidx.compose.foundation.lazy.grid.LazyVerticalGrid
import androidx.compose.foundation.lazy.staggeredgrid.LazyVerticalStaggeredGrid
import androidx.compose.foundation.lazy.staggeredgrid.StaggeredGridCells
import androidx.compose.foundation.lazy.staggeredgrid.StaggeredGridItemSpan
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.sportsphere.ui.theme.GrayImage

@Composable
fun PhotoPage(
    modifier: Modifier = Modifier,

) {
    LazyVerticalStaggeredGrid(
        columns = StaggeredGridCells.Fixed(2),
    ){
        items(10){
                photoCard(1.toFloat(),1.toFloat())
        }
    }
}

@Preview(name = "PhotoPage", showBackground = true)
@Composable
private fun PreviewPhotoPage() {
//    PhotoPage()
}

@Composable
fun photoCard(h: Float, w: Float){
    Box(
        Modifier
            .padding(2.dp)
            .wrapContentHeight()
            .fillMaxWidth()
            .aspectRatio(h/w)
            .background(color = GrayImage),) {

    }
}