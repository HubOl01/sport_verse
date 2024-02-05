package com.example.sportsphere.viewModel

import android.app.Application
import androidx.lifecycle.AndroidViewModel
import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import androidx.lifecycle.viewModelScope
import com.example.sportsphere.databases.TrainingPlanDatabase
import com.example.sportsphere.databases.models.TrainingPlan
import com.example.sportsphere.databases.repositories.TrainingPlanRepository
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch

class TrainingPlansViewModel(application: Application) : AndroidViewModel(application) {
    val readAllData: LiveData<List<TrainingPlan>>
    private val repository: TrainingPlanRepository

    init {
        val plansDao = TrainingPlanDatabase.getInstance(application).trainingPlanDao()
        repository = TrainingPlanRepository(plansDao)
        readAllData = repository.readAllData
    }

    fun addData(dataItem: TrainingPlan) {
        viewModelScope.launch(Dispatchers.IO) {
            repository.addPlan(dataItem)
        }
    }

    fun updateData(dataItem: TrainingPlan) {
        viewModelScope.launch(Dispatchers.IO) {
            repository.updatePlan(dataItem)
        }
    }

    fun deleteData(dataItem: TrainingPlan) {
        viewModelScope.launch(Dispatchers.IO) {
            repository.deletePlan(dataItem)
        }
    }

    fun deleteAllData(dataItem: TrainingPlan) {
        viewModelScope.launch(Dispatchers.IO) {
            repository.deleteAllPlans()
        }
    }

}

class TrainingPlansViewModelFactory(
    private val application: Application
) : ViewModelProvider.Factory {
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        @Suppress("UNCHECKED_CAST")
        if (modelClass.isAssignableFrom(TrainingPlansViewModel::class.java)) {
            return TrainingPlansViewModel(application) as T
        }
        throw IllegalArgumentException("Unknown ViewModel class")
    }
}
