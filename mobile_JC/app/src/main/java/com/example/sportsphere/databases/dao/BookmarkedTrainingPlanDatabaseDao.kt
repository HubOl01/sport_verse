package com.example.sportsphere.databases.dao

import androidx.lifecycle.LiveData
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.Query
import androidx.room.Update
import com.example.sportsphere.databases.models.Exercise


interface BookmarkedTrainingPlanDatabaseDao {
    @Query("SELECT * from bookmarked_training_plan")
    fun getAll(): LiveData<List<Exercise>>

    @Query("SELECT * from bookmarked_training_plan where id = :id")
    fun getById(id: Int) : Exercise?

    @Insert
    suspend fun insert(item:Exercise)

    @Update
    suspend fun update(item:Exercise)

    @Delete
    suspend fun delete(item:Exercise)

    @Query("DELETE FROM bookmarked_training_plan")
    suspend fun deleteAll()
}