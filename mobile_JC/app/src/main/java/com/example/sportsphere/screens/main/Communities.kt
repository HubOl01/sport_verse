package com.example.sportsphere.screens.main

import java.time.LocalDateTime

data class Community(
    val idCommunity: Int,
    val url_avatar: String,
    val name: String,
    val communityProfile: CommunityProfile,
    val createdAt: LocalDateTime,
    val subscribers: Long,
    val posts: List<PostModel>?,
)

data class CommunityProfile(
    val idCommunityProfile: Int,
    val status: String?,
    val sport_type: String?,
    val about: String?,
    val admins: Int?,
)

val communityProfiles = listOf<CommunityProfile>(
    CommunityProfile(
        idCommunityProfile = 0,
        status = "Новостное сообщество",
        sport_type = "Футбол",
        about = "Футбольные новости 24/7! Будь в курсе последних событий твоего любимого вида спорта! Новости, обзоры, результаты, трансляции и многое другое здесь!",
        admins = null,
    ),
    CommunityProfile(
        idCommunityProfile = 1,
        status = "Блог",
        sport_type = "Любой спорт",
        about = "Энергия спорта в каждом посте! Все о любимых играх, героях и успехах. Присоединяйтесь к нам за дозой спортивного вдохновения!",
        admins = null,
    ),
    CommunityProfile(
        idCommunityProfile = 2,
        status = "Новостное сообщество",
        sport_type = "Хоккей",
        about = "Ваш источник горячих новостей хоккея! Тут - свежие результаты, интервью и аналитика. Присоединяйтесь к нам, чтобы быть в курсе всего, что происходит в хоккейном мире!",
        admins = null,
    )
)

val communities = listOf<Community>(
    Community(
        idCommunity = 0,
        url_avatar = "https://firebasestorage.googleapis.com/v0/b/sportsphere-f1f2e.appspot.com/o/images%2Favatar3.png?alt=media&token=031ea5a1-3821-4d6d-a60d-b9f76cb1e281",
        name = "Футбольный матч",
        createdAt = LocalDateTime.now(),
        subscribers = 34214,
        communityProfile = communityProfiles[0],
        posts = listOf<PostModel>(
            PostModel(
                idPost = 0,
                userId = null,
                communityId = null,
                title = null.toString(),
                description = """Сегодня на чемпионате мира по футболу состоится долгожданный матч между командами Франции и Аргентины. Обе команды являются одними из фаворитов турнира, и их встреча обещает быть захватывающей.
 
 Игроки Франции, ведомые Килианом Мбаппе, находятся в отличной форме и имеют в своем активе несколько ярких побед на этом чемпионате. Аргентина, в свою очередь, также демонстрирует уверенную игру и высокий уровень мастерства.
 
 Ожидается, что этот матч станет одним из самых ярких событий турнира и определит лидера в группе. Болеем за наших и желаем удачи""".prependIndent(),
                photos = listOf(
                    Photo_for_post(
                        idPhoto = 0,
                        url_image = "https://firebasestorage.googleapis.com/v0/b/sportsphere-f1f2e.appspot.com/o/images%2Fimage_for_post.jpg?alt=media&token=8e8cbbf1-d274-4fc7-b68c-b4c96742ef8d",
                        postId = 0
                    )
                ),
                videos = null,
                files = null,
                comments = null,
                likes = 234,
                views = 563,
                createdAt = LocalDateTime.now(),
                updatedAt = null
            ),
            PostModel(
                idPost = 2,
                userId = null,
                communityId = null,
                title = null.toString(),
                description = """Сегодня мы поговорим о том, какие виды спорта являются самыми популярными среди молодежи. Согласно последним исследованиям, самыми популярными видами спорта среди молодых людей являются футбол, баскетбол и волейбол. Эти игры не только помогают поддерживать физическую форму, но и развивают командный дух и лидерские качества. Кроме того, многие молодые люди увлекаются экстремальными видами спорта, такими как скейтбординг, сноубординг и парашютный спорт.""".prependIndent(),
                photos = listOf(
                    Photo_for_post(
                        idPhoto = 0,
                        url_image = "https://firebasestorage.googleapis.com/v0/b/sportsphere-f1f2e.appspot.com/o/images%2F2.jpg?alt=media&token=988b3a0b-c046-4e67-9389-fc86796447ae",
                        postId = 2
                    )
                ),
                videos = null,
                files = null,
                comments = null,
                likes = 432890,
                views = 1000000,
                createdAt = LocalDateTime.now(),
                updatedAt = null
            ),
            PostModel(
                idPost = 4,
                userId = null,
                communityId = null,
                title = null.toString(),
                description = """Сегодня мы рады сообщить вам о победе российской сборной по футболу на Чемпионате Европы 2018 года! Команда продемонстрировала высокий уровень подготовки и показала отличную игру на протяжении всего турнира. Российские футболисты заслуженно стали чемпионами Европы и получили право выступить на Чемпионате Мира 2018 года в России.""".prependIndent(),
                photos = listOf(
                    Photo_for_post(
                        idPhoto = 0,
                        url_image = "https://firebasestorage.googleapis.com/v0/b/sportsphere-f1f2e.appspot.com/o/images%2F3.jpg?alt=media&token=bfc2dc56-ab99-4a8b-a716-2aa0a9f2edc1", postId=4)),
                videos = null,
                files = null,
                comments = null,
                likes = 645,
                views = 5643,
                createdAt = LocalDateTime.now(),
                updatedAt = null
            ),
        ),
    ),
    Community(
        idCommunity = 1,
        name = "СпортПульс",
        url_avatar = "https://firebasestorage.googleapis.com/v0/b/sportsphere-f1f2e.appspot.com/o/images%2Favatar1.1.png?alt=media&token=b417c729-67ab-4102-a63c-cddc13568b71",
        createdAt = LocalDateTime.now(),
        subscribers = 453662,
        communityProfile = communityProfiles[1],
        posts = listOf<PostModel>(
            PostModel(
                idPost = 1,
                userId = null,
                communityId = null,
                title = null.toString(),
                description = """Сегодня мы поговорим о том, как важно правильно питаться для достижения успеха в спорте. Каждый спортсмен знает, что правильное питание является одним из ключевых факторов в достижении высоких результатов. В этой статье мы рассмотрим основные принципы здорового питания для спортсменов.""".prependIndent(),
                photos = listOf(
                    Photo_for_post(
                        idPhoto = 0,
                        url_image = "https://firebasestorage.googleapis.com/v0/b/sportsphere-f1f2e.appspot.com/o/images%2F1.jpg?alt=media&token=93b87a0e-4bba-47d0-91ff-defdfd619396", postId = 1
                    )
                ),
                videos = null,
                files = null,
                comments = null,
                likes = 12,
                views = 100,
                createdAt = LocalDateTime.now(),
                updatedAt = null
            ),
            PostModel(
                idPost = 3,
                userId = null,
                communityId = null,
                title = null.toString(),
                description = """Сегодня мы поговорим о том, какие преимущества имеют занятия спортом для здоровья человека. Спорт помогает укрепить сердечно-сосудистую систему, улучшить работу легких и повысить выносливость организма. Кроме того, регулярные занятия спортом способствуют снижению уровня стресса и улучшению настроения.""".prependIndent(),
                photos = null,
                videos = null,
                files = null,
                comments = null,
                likes = 6365,
                views = 8790,
                createdAt = LocalDateTime.now(),
                updatedAt = null
            ),
        ),
    ),
    Community(
        idCommunity = 2,
        name = "Хоккей - аналитика, новости",
        url_avatar = "https://firebasestorage.googleapis.com/v0/b/sportsphere-f1f2e.appspot.com/o/images%2Favatar4.jpg?alt=media&token=757ae1cd-920d-4c58-b404-6e5337e39de9",
        createdAt = LocalDateTime.now(),
        subscribers = 34214,
        communityProfile = communityProfiles[2],
        posts = listOf<PostModel>(
            PostModel(
                idPost = 5,
                userId = null,
                communityId = null,
                title = null.toString(),
                description = """Сегодня мы рады сообщить вам о победе российской сборной по хоккею на Чемпионате Мира 2019 года! Команда продемонстрировала высокий уровень подготовки и показала отличную игру на протяжении всего турнира. Российские хоккеисты заслуженно стали чемпионами мира и получили право выступить на Олимпийских играх 2020 года в Пхенчхане.""".prependIndent(),
                photos = listOf(
                    Photo_for_post(
                        idPhoto = 0,
                        url_image = "https://firebasestorage.googleapis.com/v0/b/sportsphere-f1f2e.appspot.com/o/images%2F4.jpg?alt=media&token=fbc9d1a8-91bd-4452-81a3-c3af64231c9b", postId=5)),
                videos = null,
                files = null,
                comments = null,
                likes = 43567,
                views = 87658,
                createdAt = LocalDateTime.now(),
                updatedAt = null
            )
        ),
    ),
)