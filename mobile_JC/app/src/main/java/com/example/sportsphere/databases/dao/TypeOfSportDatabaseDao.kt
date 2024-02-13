package com.example.sportsphere.databases.dao

import androidx.lifecycle.LiveData
import androidx.room.Dao
import androidx.room.Delete
import androidx.room.Insert
import androidx.room.Query
import androidx.room.Transaction
import androidx.room.Update
import com.example.sportsphere.databases.models.TypeOfSport
import com.example.sportsphere.databases.models.TypeOfSportWithPlans

@Dao
interface TypeOfSportDatabaseDao {
    @Transaction
    @Query("SELECT * from TypeOfSport")
    fun getAll(): LiveData<List<TypeOfSportWithPlans>>

    @Query("SELECT * from TypeOfSport where idTypeOfSport = :id")
    fun getById(id: Int) : TypeOfSport?

    @Insert
    suspend fun insert(item:TypeOfSport)

    @Update
    suspend fun update(item:TypeOfSport)

    @Delete
    suspend fun delete(item:TypeOfSport)

    @Query("DELETE FROM TypeOfSport")
    suspend fun deleteAll()
}