package com.example.sportsphere.network.interfaces

interface PostService {

    @GET("your_endpoint_here")
    suspend fun getPosts(): List<PostModelElement>

}