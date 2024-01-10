// To parse the JSON, install kotlin's serialization plugin and do:
//
// val json     = Json { allowStructuredMapKeys = true }
// val teachers = json.parse(Teachers.serializer(), jsonString)

package com.example.sportsphere

import kotlinx.serialization.*
import kotlinx.serialization.json.*
import kotlinx.serialization.descriptors.*
import kotlinx.serialization.encoding.*

typealias Teachers = JsonArray<Teacher>

@Serializable
data class Teacher (
    val idPost: Long,

    @SerialName("userId")
    val userID: Long,

    @SerialName("communityId")
    val communityID: JsonElement? = null,

    val title: String,
    val description: String,
    val createdAt: String,
    val updatedAt: String,
    val user: User,
    val community: JsonElement? = null,
    val photos: JsonArray,
    val videos: JsonArray,
    val files: JsonArray,
    val comments: JsonArray,
    val likes: List<Like>,
    val views: List<View>,
    val bookmarksPost: JsonArray
)

@Serializable
data class Like (
    val idLike: Long,

    @SerialName("userId")
    val userID: Long,

    @SerialName("postId")
    val postID: Long
)

@Serializable
data class User (
    val idUser: Long,
    val email: String,
    val username: String,
    val idUsername: String,

    @SerialName("url_avatar")
    val urlAvatar: String,

    val isCoach: Boolean,
    val isBan: Boolean,
    val isOffical: Boolean,
    val isAdmin: Boolean,
    val createdAt: String
)

@Serializable
data class View (
    val idView: Long,

    @SerialName("userId")
    val userID: Long,

    @SerialName("postId")
    val postID: Long
)
