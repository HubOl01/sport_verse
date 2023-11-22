package com.example.sportsphere.screens.main

import java.time.LocalDate
import java.time.LocalDateTime

data class User (
    val idUser: Int,
    val email: String?,
    val username: String,
    val idUsername: String,
    val url_avatar: String,
    val isCoach: Boolean,
    val isBan: Boolean,
    val isOffical: Boolean,
    val profile: Profile?,
    val posts: List<PostModel>?,
//    val comments: Comment,
    val createdAt: LocalDateTime,
)
data class Profile(
    val idProfile: Int,
    val status: String?,
    val sport_type: String?,
    val about: String?,
    val dateOfBirth: LocalDateTime,
    val userId: Int,
)

val profiles = listOf<Profile>(
    Profile(
        idProfile=0,
        status= "Спортсмен",
        sport_type= "Футбол",
        about= "Самый лучший футболист в мире",
        dateOfBirth= LocalDateTime.of(2002, 3, 18, 0,0,0),
        userId= 0,
    ),
    Profile(
        idProfile=1,
        status= "Спортсмен",
        sport_type= "Хоккей",
        about= "Ценный игрок комманды NHL24",
        dateOfBirth= LocalDateTime.of(2000, 1, 4, 0,0,0),
        userId= 1,
    ),
    Profile(
        idProfile=2,
        status= "Спортсмен",
        sport_type= "Конькобежный спорт",
        about= "Я конькобежец международного класса",
        dateOfBirth= LocalDateTime.of(1993, 4, 20, 0,0,0),
        userId= 2,
    )
)

val users = listOf<User>(
    User(
        idUser = 0,
        email = "test@test.io",
        username = "tester",
        idUsername = "user_1234",
        url_avatar = "https://firebasestorage.googleapis.com/v0/b/sportsphere-f1f2e.appspot.com/o/images%2FKQjrBVk8hL8.jpg?alt=media&token=8686f26f-dbfb-4811-80df-93d688b9b181",
        isCoach = false,
        isBan = false,
        isOffical = false,
        profile = profiles[0],
        posts = null,
        createdAt = LocalDateTime.now(),
    ),
    User(
        idUser = 1,
        email = "master@cop.com",
        username = "master",
        idUsername = "user_3442",
        url_avatar = "https://firebasestorage.googleapis.com/v0/b/sportsphere-f1f2e.appspot.com/o/images%2FKQjrBVk8hL8.jpg?alt=media&token=8686f26f-dbfb-4811-80df-93d688b9b181",
        isCoach = false,
        isBan = false,
        isOffical = false,
        profile = profiles[1],
        posts = null,
        createdAt = LocalDateTime.now(),
    ),
    User(
        idUser = 2,
        email = "nano@goat.com",
        username = "nano",
        idUsername = "user_8789",
        url_avatar = "https://firebasestorage.googleapis.com/v0/b/sportsphere-f1f2e.appspot.com/o/images%2FKQjrBVk8hL8.jpg?alt=media&token=8686f26f-dbfb-4811-80df-93d688b9b181",
        isCoach = false,
        isBan = false,
        isOffical = false,
        profile = profiles[2],
        posts = null,
        createdAt = LocalDateTime.now(),
    ),
)