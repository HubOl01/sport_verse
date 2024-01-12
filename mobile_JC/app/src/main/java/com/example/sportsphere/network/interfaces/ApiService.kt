package com.example.sportsphere.network.interfaces

import kotlinx.serialization.ExperimentalSerializationApi
import kotlinx.serialization.json.Json
import okhttp3.MediaType
import okhttp3.MediaType.Companion.toMediaType
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

//val contentType = "application/json".toMediaType()
//val kotlinxConverterFactory = Json.asConverterFactory(contentType)
//
//val retrofit = Retrofit.Builder()
//    .addConverterFactory(kotlinxConverterFactory)
//    .baseUrl("http://192.168.1.68:3000")
//    .build()
//
//val apiService: PostService = retrofit.create(PostService::class.java)

//object ApiService {
//    private val contentType = "application/json".toMediaType()
////    val json  = Json { allowStructuredMapKeys = true }
////    val posts = json.parse(Posts.serializer(), jsonString)
//    private val kotlinxConverterFactory = Json{ allowStructuredMapKeys = true  }.asConverterFactory(contentType)
//
//    private val retrofit = Retrofit.Builder()
//        .addConverterFactory(kotlinxConverterFactory)
//        .baseUrl("http://192.168.1.68:3000")
//        .build()
//
//    val postService: PostService by lazy { retrofit.create(PostService::class.java) }


//    val contentType = "application/json".toMediaType()
//    val json = Json { ignoreUnknownKeys = true }

//    val retrofit = Retrofit.Builder()
//        .baseUrl("http://192.168.1.68:3000") // Replace with your actual base URL
//        .addConverterFactory(json.asConverterFactory(contentType))
//        .build()
//val contentType = MediaType.get("application/json")
//    return Retrofit.Builder()
//    .addConverterFactory(serializationConverterFactory(contentType, JSON))
//    .baseUrl(BASE_URL)
//    .client(provideOkhttpClient())
//    .build()
//
//val contentType = "application/json".toMediaType()
//    val retrofit = Retrofit.Builder()
//        .baseUrl("http://192.168.1.68:3000")
//        .addConverterFactory(Json.asConverterFactory(contentType))
//        .build()
//    val postService: PostService = retrofit.create(PostService::class.java)
//}


object ApiService {
    val retrofit = Retrofit.Builder()
        .baseUrl("http://192.168.1.68:3000")
        .addConverterFactory(GsonConverterFactory.create())
        .build()
        .create(PostService::class.java)
}
