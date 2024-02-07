package com.example.sportsphere.databases.dao

import androidx.lifecycle.LiveData
import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.Query
import androidx.room.Update
import com.example.sportsphere.databases.models.Category

@Dao
interface CategoryDatabaseDao {
    @Query("SELECT * from Category")
    fun getAll(): LiveData<List<Category>>

    @Query("SELECT * from Category where idCategory = :id")
    fun getById(id: Int) : Category?

    @Insert
    suspend fun insert(item:Category)

    @Update
    suspend fun update(item:Category)

    @Delete
    suspend fun delete(item:Category)

    @Query("DELETE FROM Category")
    suspend fun deleteAll()
}