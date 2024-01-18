package com.example.sportsphere

import androidx.room.Room
import androidx.test.ext.junit.runners.AndroidJUnit4
import androidx.test.platform.app.InstrumentationRegistry
import com.example.sportsphere.databases.TrainingPlanDatabase
import com.example.sportsphere.databases.dao.TrainingPlanDatabaseDao
import com.example.sportsphere.databases.models.TrainingPlan
import junit.framework.TestCase.assertEquals
import kotlinx.coroutines.runBlocking
import org.junit.After
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import java.io.IOException
import java.time.LocalDateTime

@RunWith(AndroidJUnit4::class)
class TrainingPlanDatabaseTest {

    private lateinit var trainingPlanDao: TrainingPlanDatabaseDao
    private lateinit var db: TrainingPlanDatabase

    @Before
    fun createDb() {
        val context = InstrumentationRegistry.getInstrumentation().targetContext

        db = Room.inMemoryDatabaseBuilder(context, TrainingPlanDatabase::class.java)
            .allowMainThreadQueries()
            .build()

        trainingPlanDao = db.trainingPlanDao()
    }

    @After
    @Throws(IOException::class)
    fun deleteDb() {
        db.close()
    }

    @Test
    @Throws(Exception::class)
    fun insertAndGetTrainingPlan() = runBlocking {
        val trainingPlanItem = TrainingPlan(
            idTrainingPlan = 1,
            title = "Тренировка на 18.01.24",
            description = "",
            startDate = LocalDateTime.now(),
            endDate = LocalDateTime.now(),
            createdAt = LocalDateTime.now(),
            PlanProgress = 0f,
            typeOfSport = emptyList(),
            categories = emptyList(),
            exercises = emptyList(),
            trainingResults = emptyList()
        )
        trainingPlanDao.insert(trainingPlanItem)
        val oneItem = trainingPlanDao.getById(1)
        assertEquals(oneItem?.idTrainingPlan, 1)
    }
}