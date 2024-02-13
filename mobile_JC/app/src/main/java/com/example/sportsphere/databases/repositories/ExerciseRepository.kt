package com.example.sportsphere.databases.repositories

import androidx.lifecycle.LiveData
import com.example.sportsphere.databases.dao.ExerciseDatabaseDao
import com.example.sportsphere.databases.models.Exercise
import com.example.sportsphere.databases.models.TrainingPlan


class ExerciseRepository(private val exerciseDatabaseDao: ExerciseDatabaseDao) {
    val readAllData : LiveData<List<Exercise>> = exerciseDatabaseDao.getAll()
    suspend fun addPlan(exerciseItem: Exercise) {
        exerciseDatabaseDao.insert(exerciseItem)
    }
    suspend fun updatePlan(exerciseItem: Exercise) {
        exerciseDatabaseDao.update(exerciseItem)
    }
    suspend fun deletePlan(exerciseItem: Exercise) {
        exerciseDatabaseDao.delete(exerciseItem)
    }
    suspend fun deleteAllPlans() {
        exerciseDatabaseDao.deleteAll()
    }
}