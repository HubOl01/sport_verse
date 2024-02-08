package com.example.sportsphere.databases.models

import androidx.room.Entity
import androidx.room.PrimaryKey
import androidx.room.Relation
import java.time.LocalDateTime

// Модель пользователя
@Entity(tableName = "user")
data class User(
    @PrimaryKey(autoGenerate = true)
    val idUser: Int = 0,

    val email: String?,

    val username: String,

    val isBan: Boolean = false,

    val isAdmin: Boolean = false,

    val createdAt: String = getDateFormaters(LocalDateTime.now()),

    // Зависимости от других таблиц
//    @Relation(parentColumn = "idUser", entityColumn = "userId")
//    val trainingPlans: List<TrainingPlan>,

//    @Relation(parentColumn = "idUser", entityColumn = "userId")
//    val trainingResults: List<TrainingResult>,
//
//    @Relation(parentColumn = "idUser", entityColumn = "userId")
//    val bookmarksTrainingPlan: List<BookmarkedTrainingPlan>
)
