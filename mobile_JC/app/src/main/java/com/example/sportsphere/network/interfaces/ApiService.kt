package com.example.sportsphere.network.interfaces

import com.example.sportsphere.network.model.Posts
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.GET


//object ApiService {
//    val retrofit = Retrofit.Builder()
//        .baseUrl("http://192.168.1.68:3000")
//        .addConverterFactory(GsonConverterFactory.create())
//        .build()
//        .create(PostService::class.java)
//}

interface ApiService {
    @GET("/posts")
    suspend fun getPosts() : Posts


    companion object {
        var apiService: ApiService? = null
        fun getInstance() : ApiService {
            if (apiService == null) {
                apiService = Retrofit.Builder()
                    .baseUrl("http://192.168.1.68:3000")
                    .addConverterFactory(GsonConverterFactory.create())
                    .build().create(ApiService::class.java)
            }
            return apiService!!
        }
    }
}
