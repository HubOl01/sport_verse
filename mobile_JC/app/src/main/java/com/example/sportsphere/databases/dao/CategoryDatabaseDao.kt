//package com.example.sportsphere.databases.dao
//
//import androidx.lifecycle.LiveData
//import androidx.room.Dao
//import androidx.room.Delete
//import androidx.room.Insert
//import androidx.room.Query
//import androidx.room.Transaction
//import androidx.room.Update
//import com.example.sportsphere.databases.models.Category
//import com.example.sportsphere.databases.models.CategoryWithPlans
//import com.example.sportsphere.databases.models.TypeOfSportWithPlans
//
//@Dao
//interface CategoryDatabaseDao {
//    //    @Query("SELECT * from Category")
////    fun getAll(): LiveData<List<Category>>
//    @Transaction
//    @Query("SELECT * from Category")
//    fun getAll(): LiveData<List<CategoryWithPlans>>
//
//    @Query("SELECT * from Category where idCategory = :id")
//    fun getById(id: Int): Category?
//
//    @Insert
//    suspend fun insert(item: Category)
//
//    @Update
//    suspend fun update(item: Category)
//
//    @Delete
//    suspend fun delete(item: Category)
//
//    @Query("DELETE FROM Category")
//    suspend fun deleteAll()
//}