package com.example.sportsphere.viewModel

import android.util.Log
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.setValue
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.sportsphere.network.interfaces.ApiService
import com.example.sportsphere.network.model.Post
import com.example.sportsphere.network.model.Posts
import kotlinx.coroutines.launch

class PostViewModel : ViewModel() {

    var postsListResponse: List<Post> by mutableStateOf(listOf())
    var errorMessage: String by mutableStateOf("")
    fun getPostsList() {
        viewModelScope.launch {
            val apiService = ApiService.getInstance()
            try {
                val postsList = apiService.getPosts()
                postsListResponse = postsList
            }
            catch (e: Exception) {
                errorMessage = e.message.toString()
            }
        }
    }
}