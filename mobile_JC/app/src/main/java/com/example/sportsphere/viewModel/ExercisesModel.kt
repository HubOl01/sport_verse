package com.example.sportsphere.viewModel

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.sportsphere.databases.TrainingPlanDatabase
import com.example.sportsphere.databases.models.Exercise
import com.example.sportsphere.databases.models.TrainingPlan
import com.example.sportsphere.databases.repositories.ExerciseRepository
import com.example.sportsphere.databases.repositories.TrainingPlanRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class ExercisesViewModel(application: Application) : AndroidViewModel(application) {
    val readAllData: LiveData<List<Exercise>>
    private val repository: ExerciseRepository

    init {
        val exercisesDao = TrainingPlanDatabase.getInstance(application).exerciseDao()
        repository = ExerciseRepository(exercisesDao)
        readAllData = repository.readAllData
    }

    fun addData(dataItem: Exercise) {
        viewModelScope.launch(Dispatchers.IO) {
            repository.addExercise(dataItem)
        }
    }

    fun updateData(dataItem: Exercise) {
        viewModelScope.launch(Dispatchers.IO) {
            repository.updateExercise(dataItem)
        }
    }

    fun deleteData(dataItem: Exercise) {
        viewModelScope.launch(Dispatchers.IO) {
            repository.deleteExercise(dataItem)
        }
    }

    fun deleteAllData(dataItem: Exercise) {
        viewModelScope.launch(Dispatchers.IO) {
            repository.deleteAllExercise()
        }
    }

}

class ExercisesViewModelFactory(
    private val application: Application
) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        @Suppress("UNCHECKED_CAST")
        if (modelClass.isAssignableFrom(ExercisesViewModel::class.java)) {
            return ExercisesViewModel(application) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
