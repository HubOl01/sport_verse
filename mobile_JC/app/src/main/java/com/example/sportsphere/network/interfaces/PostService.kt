package com.example.sportsphere.network.interfaces
import com.example.sportsphere.network.model.Posts
import retrofit2.Call
import retrofit2.Response
import retrofit2.http.GET

interface PostService {
    @GET("/posts")
    suspend fun getPosts(): Posts
}

