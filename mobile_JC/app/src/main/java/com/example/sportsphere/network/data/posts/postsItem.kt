package com.example.sportsphere.network.data.posts

data class postsItem(
    val bookmarksPost: List<Any>,
    val comments: List<Any>,
    val community: Any,
    val communityId: Any,
    val createdAt: String,
    val description: String,
    val files: List<Any>,
    val idPost: Int,
    val likes: List<Like>,
    val photos: List<Any>,
    val title: String,
    val updatedAt: String,
    val user: User,
    val userId: Int,
    val videos: List<Any>,
    val views: List<View>
)