package com.example.sportsphere.network.interfaces

import com.jakewharton.retrofit2.converter.kotlinx.serialization.asConverterFactory
import kotlinx.serialization.json.Json
import okhttp3.MediaType.Companion.toMediaType
import retrofit2.Retrofit

val contentType = "application/json".toMediaType()
val retrofit = Retrofit.Builder()
    .baseUrl("http://192.168.1.68:3000/")
    .addConverterFactory(Json.asConverterFactory(contentType))
    .build()

val postService = retrofit.create(PostService::class.java)

//
//val contentType = "application/json".toMediaType()
//val retrofit = Retrofit.Builder()
//    .baseUrl("https://example.com/")
//    .addConverterFactory(Json.asConverterFactory(contentType))
//    .build()