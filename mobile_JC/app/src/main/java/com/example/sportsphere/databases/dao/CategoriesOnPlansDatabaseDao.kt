package com.example.sportsphere.databases.dao

import androidx.lifecycle.LiveData
import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.Query
import androidx.room.Update
import com.example.sportsphere.databases.models.CategoriesOnPlans

@Dao
interface CategoriesOnPlansDatabaseDao {
    @Query("SELECT * from CategoriesOnPlans")
    fun getAll(): LiveData<List<CategoriesOnPlans>>

    @Query("SELECT * from CategoriesOnPlans where trainingPlanId = :id")
    fun getById(id: Int) : CategoriesOnPlans?

    @Insert
    suspend fun insert(item:CategoriesOnPlans)

    @Update
    suspend fun update(item:CategoriesOnPlans)

    @Delete
    suspend fun delete(item:CategoriesOnPlans)

    @Query("DELETE FROM CategoriesOnPlans")
    suspend fun deleteAll()
}