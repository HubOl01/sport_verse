package com.example.sportsphere.databases

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import androidx.room.TypeConverters
import com.example.sportsphere.databases.dao.TrainingPlanDatabaseDao
import com.example.sportsphere.databases.models.TrainingPlan
//import com.example.sportsphere.utilities.CategoriesOnPlansConverter
//import com.example.sportsphere.utilities.CategoryConverter
//import com.example.sportsphere.utilities.Converter
import com.example.sportsphere.utilities.ExerciseConverter
import com.example.sportsphere.utilities.TrainingResultConverter

//import com.example.sportsphere.utilities.TypeOfSportConverter
//import com.example.sportsphere.utilities.TypesOnPlansConverter

@Database(entities = [TrainingPlan::class], version = 1, exportSchema = false)
@TypeConverters(
    ExerciseConverter::class,
    TrainingResultConverter::class
//    TypesOnPlansConverter::class,
//    CategoriesOnPlansConverter::class,
//    TypeOfSportConverter::class,
//    CategoryConverter::class,
//    ExerciseConverter::class
)
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
                        "training_plan_db"
                    ).fallbackToDestructiveMigration()
                        .build()
                    INSTANCE = instance
                }
                return instance
            }
        }
    }
}