package com.example.sportsphere.network.interfaces

import com.jakewharton.retrofit2.converter.kotlinx.serialization.asConverterFactory
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType
import retrofit2.Retrofit

val contentType = "application/json".toMediaType()
val retrofit = Retrofit.Builder()
    .baseUrl("your_base_url_here")
    .addConverterFactory(Json { ignoreUnknownKeys = true }.asConverterFactory(contentType))
    .build()

val postService = retrofit.create(PostService::class.java)
