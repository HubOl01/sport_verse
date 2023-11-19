package com.example.sportsphere.screens.main

import androidx.compose.runtime.MutableState
import java.time.LocalDate
import java.time.LocalDateTime

data class PostModel(
    val idPost: Int,
//    val userId: Int,
//    val communityId: Int,
    val title: String,
    val description: String,
    val photos: List<Photo_for_post>,
    val videos: List<Video_for_post>,
    val files: List<File_for_post>,
    val comments: List<CommentModel>,
    val likes: Long,
    val views: Long,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime?,
)

data class Photo_for_post(
    val idPhoto: Int,
    val url_image: String,
    val postId: Int,
)

data class Video_for_post(
    val idVideo: Int,
    val url_video: String,
    val postId: Int,
)

data class File_for_post(
    val idFile: Int,
    val url_File: String,
    val postId: Int,
)

data class CommentModel(
    val idComment: Int,
    val userId: Int,
    val postId: Int,
    val CommentText: String,
    val CommentDate: LocalDateTime,
)

val DataPosts = listOf(
    PostModel(
        idPost = 0,
        title = null.toString(),
        description = """Сегодня на чемпионате мира по футболу состоится долгожданный матч между командами Франции и Аргентины. Обе команды являются одними из фаворитов турнира, и их встреча обещает быть захватывающей.
 
 Игроки Франции, ведомые Килианом Мбаппе, находятся в отличной форме и имеют в своем активе несколько ярких побед на этом чемпионате. Аргентина, в свою очередь, также демонстрирует уверенную игру и высокий уровень мастерства.
 
 Ожидается, что этот матч станет одним из самых ярких событий турнира и определит лидера в группе. Болеем за наших и желаем удачи""".prependIndent(),
        photos = listOf(
            Photo_for_post(
                idPhoto = 0,
                url_image = "https://firebasestorage.googleapis.com/v0/b/sportsphere-f1f2e.appspot.com/o/images%2Fimage_for_post.jpg?alt=media&token=8e8cbbf1-d274-4fc7-b68c-b4c96742ef8d", postId = 0
            )
        ),
        videos = emptyList(),
        files = emptyList(),
        comments = emptyList(),
        likes = 123,
        views = 200,
        createdAt = LocalDateTime.now(),
        updatedAt = null
    ),
    PostModel(
        idPost = 1,
        title = null.toString(),
        description = """Сегодня мы поговорим о том, как важно правильно питаться для достижения успеха в спорте. Каждый спортсмен знает, что правильное питание является одним из ключевых факторов в достижении высоких результатов. В этой статье мы рассмотрим основные принципы здорового питания для спортсменов.""".prependIndent(),
        photos = listOf(
            Photo_for_post(
                idPhoto = 0,
                url_image = "https://firebasestorage.googleapis.com/v0/b/sportsphere-f1f2e.appspot.com/o/images%2F1.jpg?alt=media&token=93b87a0e-4bba-47d0-91ff-defdfd619396", postId = 1
            )
        ),
        videos = emptyList(),
        files = emptyList(),
        comments = emptyList(),
        likes = 12,
        views = 100,
        createdAt = LocalDateTime.now(),
        updatedAt = null
    ),
    PostModel(
        idPost = 2,
        title = null.toString(),
        description = """Сегодня мы поговорим о том, какие виды спорта являются самыми популярными среди молодежи. Согласно последним исследованиям, самыми популярными видами спорта среди молодых людей являются футбол, баскетбол и волейбол. Эти игры не только помогают поддерживать физическую форму, но и развивают командный дух и лидерские качества. Кроме того, многие молодые люди увлекаются экстремальными видами спорта, такими как скейтбординг, сноубординг и парашютный спорт.""".prependIndent(),
        photos = listOf(
            Photo_for_post(
                idPhoto = 0,
                url_image = "https://firebasestorage.googleapis.com/v0/b/sportsphere-f1f2e.appspot.com/o/images%2F2.jpg?alt=media&token=988b3a0b-c046-4e67-9389-fc86796447ae", postId = 2
            )
        ),
        videos = emptyList(),
        files = emptyList(),
        comments = emptyList(),
        likes = 432890,
        views = 1000000,
        createdAt = LocalDateTime.now(),
        updatedAt = null
    ),
    PostModel(
        idPost = 3,
        title = null.toString(),
        description = """Сегодня мы поговорим о том, какие преимущества имеют занятия спортом для здоровья человека. Спорт помогает укрепить сердечно-сосудистую систему, улучшить работу легких и повысить выносливость организма. Кроме того, регулярные занятия спортом способствуют снижению уровня стресса и улучшению настроения.""".prependIndent(),
        photos = emptyList(),
        videos = emptyList(),
        files = emptyList(),
        comments = emptyList(),
        likes = 12,
        views = 100,
        createdAt = LocalDateTime.now(),
        updatedAt = null
    ),
    PostModel(
        idPost = 4,
        title = null.toString(),
        description = """Сегодня мы рады сообщить вам о победе российской сборной по футболу на Чемпионате Европы 2018 года! Команда продемонстрировала высокий уровень подготовки и показала отличную игру на протяжении всего турнира. Российские футболисты заслуженно стали чемпионами Европы и получили право выступить на Чемпионате Мира 2018 года в России.""".prependIndent(),
        photos = listOf(
            Photo_for_post(
                idPhoto = 0,
                url_image = "https://firebasestorage.googleapis.com/v0/b/sportsphere-f1f2e.appspot.com/o/images%2F3.jpg?alt=media&token=bfc2dc56-ab99-4a8b-a716-2aa0a9f2edc1", postId=4)),
        videos = emptyList(),
        files = emptyList(),
        comments = emptyList(),
        likes = 12,
        views = 100,
        createdAt = LocalDateTime.now(),
        updatedAt = null
    ),
    PostModel(
        idPost = 5,
        title = null.toString(),
        description = """Сегодня мы рады сообщить вам о победе российской сборной по хоккею на Чемпионате Мира 2019 года! Команда продемонстрировала высокий уровень подготовки и показала отличную игру на протяжении всего турнира. Российские хоккеисты заслуженно стали чемпионами мира и получили право выступить на Олимпийских играх 2020 года в Пхенчхане.""".prependIndent(),
        photos = listOf(
            Photo_for_post(
                idPhoto = 0,
                url_image = "https://firebasestorage.googleapis.com/v0/b/sportsphere-f1f2e.appspot.com/o/images%2F4.jpg?alt=media&token=fbc9d1a8-91bd-4452-81a3-c3af64231c9b", postId=5)),
        videos = emptyList(),
        files = emptyList(),
        comments = emptyList(),
        likes = 12,
        views = 100,
        createdAt = LocalDateTime.now(),
        updatedAt = null
    )
)