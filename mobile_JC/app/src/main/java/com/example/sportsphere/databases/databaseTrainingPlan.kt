package com.example.sportsphere.databases

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import com.example.sportsphere.databases.dao.TrainingPlanDatabaseDao
import com.example.sportsphere.databases.models.TrainingPlan

@Database(entities = [TrainingPlan::class], version = 1)
abstract class TrainingPlanDatabase : RoomDatabase() {
    abstract fun trainingPlanDao(): TrainingPlanDatabaseDao
    companion object {
        private var INSTANCE: TrainingPlanDatabase? = null
        fun getInstance(context: Context): TrainingPlanDatabase {
            synchronized(this) {
                var instance = INSTANCE
                if (instance == null) {
                    instance = Room.databaseBuilder(
                        context.applicationContext,
                        TrainingPlanDatabase::class.java,
                        "training_plan_database"
                    ).fallbackToDestructiveMigration()
                        .build()
                    INSTANCE = instance
                }
                return instance
            }
        }
    }
}