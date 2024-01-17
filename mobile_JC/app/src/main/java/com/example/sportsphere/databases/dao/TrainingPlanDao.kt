package com.example.sportsphere.databases.dao

import androidx.lifecycle.LiveData
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.Query
import androidx.room.Update
import com.example.sportsphere.databases.models.TrainingPlan


interface TrainingPlanDao {
    @Query("SELECT * from training_plan")
    fun getAll(): LiveData<List<TrainingPlan>>

    @Query("SELECT * from training_plan where idTrainingPlan = :id")
    fun getById(id: Int) : TrainingPlan?

    @Insert
    suspend fun insert(item:TrainingPlan)

    @Update
    suspend fun update(item:TrainingPlan)

    @Delete
    suspend fun delete(item:TrainingPlan)

    @Query("DELETE FROM training_plan")
    suspend fun deleteAllTrainingPlans()
}