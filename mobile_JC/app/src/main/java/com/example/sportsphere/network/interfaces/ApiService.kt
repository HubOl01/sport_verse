package com.example.sportsphere.network.interfaces

    val contentType = "application/json".toMediaType()
    val retrofit = Retrofit.Builder()
        .baseUrl("your_base_url_here")
        .addConverterFactory(Json { ignoreUnknownKeys = true }.asConverterFactory(contentType))
        .build()

    val apiService = retrofit.create(ApiService::class.java)
