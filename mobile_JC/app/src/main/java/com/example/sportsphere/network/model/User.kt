package com.example.sportsphere.network.model

data class User(
    val createdAt: String,
    val email: String,
    val idUser: Int,
    val idUsername: String,
    val isAdmin: Boolean,
    val isBan: Boolean,
    val isCoach: Boolean,
    val isOffical: Boolean,
    val url_avatar: String,
    val username: String
)