package com.example.sportsphere.databases.dao

import androidx.lifecycle.LiveData
import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.Query
import androidx.room.Update
import com.example.sportsphere.databases.models.TypesOnPlans

@Dao
interface TypesOnPlansDatabaseDao {
    @Query("SELECT * from TypesOnPlans")
    fun getAll(): LiveData<List<TypesOnPlans>>

    @Query("SELECT * from TypesOnPlans where trainingPlanId = :id")
    fun getById(id: Int) : TypesOnPlans?

    @Insert
    suspend fun insert(item:TypesOnPlans)

    @Update
    suspend fun update(item:TypesOnPlans)

    @Delete
    suspend fun delete(item:TypesOnPlans)

    @Query("DELETE FROM training_result")
    suspend fun deleteAll()
}