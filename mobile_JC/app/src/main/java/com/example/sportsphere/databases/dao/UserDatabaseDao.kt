package com.example.sportsphere.databases.dao

import androidx.lifecycle.LiveData
import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.Query
import androidx.room.Update
import com.example.sportsphere.databases.models.Exercise

@Dao
interface UserDatabaseDao {
    @Query("SELECT * from user")
    fun getAll(): LiveData<List<Exercise>>

    @Query("SELECT * from user where idUser = :id")
    fun getById(id: Int) : Exercise?

    @Insert
    suspend fun insert(item:Exercise)

    @Update
    suspend fun update(item:Exercise)

    @Delete
    suspend fun delete(item:Exercise)

    @Query("DELETE FROM user")
    suspend fun deleteAll()
}