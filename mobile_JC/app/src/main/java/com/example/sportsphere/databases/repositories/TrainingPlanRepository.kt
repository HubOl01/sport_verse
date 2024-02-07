package com.example.sportsphere.databases.repositories

import androidx.lifecycle.LiveData
import com.example.sportsphere.databases.dao.TrainingPlanDatabaseDao
import com.example.sportsphere.databases.models.TrainingPlan


class TrainingPlanRepository(private val trainingPlanDatabaseDao: TrainingPlanDatabaseDao) {
    val readAllData : LiveData<List<TrainingPlan>> = trainingPlanDatabaseDao.getAll()
    suspend fun addPlan(trainingPlanItem: TrainingPlan) {
        trainingPlanDatabaseDao.insert(trainingPlanItem)
    }
    suspend fun updatePlan(trainingPlanItem: TrainingPlan) {
        trainingPlanDatabaseDao.update(trainingPlanItem)
    }
    suspend fun deletePlan(trainingPlanItem: TrainingPlan) {
        trainingPlanDatabaseDao.delete(trainingPlanItem)
    }
    suspend fun deleteAllPlans() {
        trainingPlanDatabaseDao.deleteAllTrainingPlans()
    }
}