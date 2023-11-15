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
import androidx.compose.material3.Card
import androidx.compose.material3.CardDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Shapes
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarColors
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.material3.contentColorFor
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Shape
import androidx.compose.ui.layout.ContentScale
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.res.stringResource
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.sportsphere.ui.theme.GrayImage
import com.example.sportsphere.ui.theme.GrayPost
import com.example.sportsphere.ui.theme.SportSphereTheme

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

@OptIn(ExperimentalMaterial3Api::class)
//@Preview(showBackground = true)
@Composable
fun MainPage() {
    Scaffold(
//        topBar = {
//            TopAppBar(
//                colors = TopAppBarDefaults.mediumTopAppBarColors(
//                    containerColor = MaterialTheme.colorScheme.primaryContainer,
//                    titleContentColor = MaterialTheme.colorScheme.primary,
//                ),
//                title = {
//                    Text("Top app bar")
//                }
//            )
//        }
    ) { it ->
        Column(
            Modifier
                .fillMaxWidth()
                .padding(it)
        ) {
//            Stories(it = it)
//            ProfilePage()
            TrainingPlanPage()
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
                IconButton(onClick = { }, modifier= Modifier.padding(0.dp)) {
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
                    Image(painter = painterResource(id = R.drawable.image_for_post), contentDescription = "Матч", contentScale = ContentScale.Crop, modifier = Modifier.fillMaxSize())
                    Text(
                        text = """Сегодня на чемпионате мира по футболу состоится долгожданный матч между командами Франции и Аргентины. Обе команды являются одними из фаворитов турнира, и их встреча обещает быть захватывающей.
 
 Игроки Франции, ведомые Килианом Мбаппе, находятся в отличной форме и имеют в своем активе несколько ярких побед на этом чемпионате. Аргентина, в свою очередь, также демонстрирует уверенную игру и высокий уровень мастерства.
 
 Ожидается, что этот матч станет одним из самых ярких событий турнира и определит лидера в группе. Болеем за наших и желаем удачи""".prependIndent(),
                        modifier = Modifier
                            .padding(horizontal = 8.dp, vertical = 10.dp)
                            .align(Alignment.BottomStart),
                        style= TextStyle(fontSize = 20.sp, color = Color.White),
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

//@Preview(showBackground = true)
@Composable
fun ProfilePage(){
Column(modifier = Modifier
    .fillMaxWidth()) {
    Column (modifier = Modifier.padding(start = 10.dp, end = 10.dp, top = 10.dp)){
        Row(verticalAlignment = Alignment.CenterVertically) {
            Box(
                modifier = Modifier
                    .size(60.dp)
                    .clip(CircleShape)
                    .background(color = Color.Blue)
            )
            Box(modifier = Modifier.width(10.dp))
            Column {
                Text(text = "User1", style = TextStyle(fontSize = 24.sp))
                Text(text = "Football", style = TextStyle(fontSize = 16.sp))
            }
        }
    Box(modifier = Modifier.height(10.dp))
    Text(text = "Мои публикации", style = TextStyle(fontSize = 20.sp))
    Box(modifier = Modifier.height(10.dp))
    }
    LazyVerticalGrid(
        columns = GridCells.Fixed(3),
        modifier = Modifier
            .fillMaxSize()
            .padding(4.dp)
    ) {
        items(60) { index ->
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
    }
}
}

@OptIn(ExperimentalMaterial3Api::class)
//@Preview(showBackground = true)
@Composable
fun TrainingPlanPage(){
    Scaffold(
        topBar = {
            TopAppBar(title = { Text(text = "План тренировок") })
        }
    ) {
        it ->
        Column(modifier = Modifier.padding(it)) {

        }
    }
}

@Preview
@Composable
fun CardPlan(){
    Card(modifier = Modifier.padding(10.dp)) {
        Column(modifier = Modifier.fillMaxWidth().padding(10.dp)){
            Text("Тренировка на 23.11.2023", style = TextStyle(fontSize = 32.sp, fontWeight = FontWeight.Bold))
            Row(modifier = Modifier
                .fillMaxWidth()) {
               ClipText(text = "Тяжелая атлетика", color = Color.Red)
                ClipText(text = "Силовая", color = Color.Green)
            }
        }
    }
}

@Composable
fun ClipText(text: String, color: Color){
    Box(modifier = Modifier
        .clip(
            RoundedCornerShape(30)
        )){
        Text(text, style= TextStyle(color=Color.White), modifier = Modifier.padding(horizontal = 10.dp, vertical = 8.dp))
    }
}