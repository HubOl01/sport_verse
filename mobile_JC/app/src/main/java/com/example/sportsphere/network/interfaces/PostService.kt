package com.example.sportsphere.network.interfaces

import com.example.sportsphere.Post
import com.example.sportsphere.screens.main.PostModel
import retrofit2.http.GET

interface PostService {

    @GET("posts")
    suspend fun getPosts(): List<Post>

}