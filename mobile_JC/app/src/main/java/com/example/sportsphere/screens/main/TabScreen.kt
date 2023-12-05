import androidx.compose.foundation.ExperimentalFoundationApi
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.PaddingValues
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.pager.HorizontalPager
import androidx.compose.foundation.pager.rememberPagerState
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Tab
import androidx.compose.material3.TabRow
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import androidx.navigation.compose.rememberNavController
import com.example.sportsphere.navigations.BottomBarScreen.Home.icon
import com.example.sportsphere.screens.main.FeedPage
import com.example.sportsphere.screens.main.PhotoPage
import com.example.sportsphere.screens.main.VideoPage
import kotlinx.coroutines.launch

data class TabModel(
    val title: String,
)
@OptIn(ExperimentalFoundationApi::class)
@Composable
fun TabScreen(navController: NavController, it: PaddingValues) {
    val tabItems = listOf(
        TabModel("Главная"),
        TabModel("Видео"),
        TabModel("Фото"),
    )

    val pagerState = rememberPagerState(pageCount = {tabItems.size})
    val scope = rememberCoroutineScope()

    Column(Modifier.padding(it)) {
        TabRow(selectedTabIndex = pagerState.currentPage) {
            tabItems.forEachIndexed { index, item ->
                TabItem(
                    onClick = { scope.launch { pagerState.scrollToPage(index) } },
                    selected = pagerState.currentPage == index,
                    title = item.title,
                )
            }
        }
        HorizontalPager(state = pagerState) { currentPage ->
            when(currentPage) {
                0 -> { FeedPage(navController) }
                1 -> { VideoPage() }
                2 -> { PhotoPage() }
            }
        }
    }
}

@Composable
fun TabItem(
    onClick: () -> Unit,
    selected: Boolean,
    title: String,
) {
    val selectedColor = if (selected) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.onBackground

    Tab(selected = selected, onClick = onClick) {

            Text(
                modifier = Modifier.align(Alignment.CenterHorizontally).padding(10.dp),
                text = title,
                color = selectedColor
            )
        }

}