package com.example.sportsphere.utilities

import androidx.room.TypeConverter
import com.example.sportsphere.databases.models.Exercise
//import com.example.sportsphere.databases.models.CategoriesOnPlans
//import com.example.sportsphere.databases.models.Category
//import com.example.sportsphere.databases.models.Exercise
import com.example.sportsphere.databases.models.ExerciseResult
import com.example.sportsphere.databases.models.TrainingResult
//import com.example.sportsphere.databases.models.TypeOfSport
//import com.example.sportsphere.databases.models.TypesOnPlans

import com.google.gson.Gson
import com.google.gson.reflect.TypeToken


//class HobbiesConverter {
//    @TypeConverter
//    fun fromHobbies(hobbies: List<String?>): String {
//        return hobbies.stream().collect(Collectors.joining(","))
//    }
//
//    @TypeConverter
//    fun toHobbies(data: String): List<String> {
//        return Arrays.asList(*data.split(",".toRegex()).dropLastWhile { it.isEmpty() }
//            .toTypedArray())
//    }
//}
//class TypesOnPlansConverter {
//    private val gson = Gson()
//
//    @TypeConverter
//    fun fromList(typesOnPlansList: List<TypesOnPlans>): String {
//        return gson.toJson(typesOnPlansList)
//    }
//
//    @TypeConverter
//    fun toList(typesOnPlansString: String): List<TypesOnPlans> {
//        val listType = object : TypeToken<List<TypesOnPlans>>() {}.type
//        return gson.fromJson(typesOnPlansString, listType)
//    }
//}

//class CategoriesOnPlansConverter {
//    private val gson = Gson()
//
//    @TypeConverter
//    fun fromList(valueList: List<CategoriesOnPlans>): String {
//        return gson.toJson(valueList)
//    }
//
//    @TypeConverter
//    fun toList(value: String): List<CategoriesOnPlans> {
//        val listType = object : TypeToken<List<CategoriesOnPlans>>() {}.type
//        return gson.fromJson(value, listType)
//    }
//}

//class TypeOfSportConverter {
//    private val gson = Gson()
//
//    @TypeConverter
//    fun fromList(valueList: List<TypeOfSport>): String {
//        return gson.toJson(valueList)
//    }
//
//    @TypeConverter
//    fun toList(value: String): List<TypeOfSport> {
//        val listType = object : TypeToken<List<TypeOfSport>>() {}.type
//        return gson.fromJson(value, listType)
//    }
//}

//class CategoryConverter {
//    private val gson = Gson()
//
//    @TypeConverter
//    fun fromList(valueList: List<Category>): String {
//        return gson.toJson(valueList)
//    }
//
//    @TypeConverter
//    fun toList(value: String): List<Category> {
//        val listType = object : TypeToken<List<Category>>() {}.type
//        return gson.fromJson(value, listType)
//    }
//}

class ExerciseConverter {
    private val gson = Gson()

    @TypeConverter
    fun fromList(valueList: List<Exercise>): String {
        return gson.toJson(valueList)
    }

    @TypeConverter
    fun toList(value: String): List<Exercise> {
        val listType = object : TypeToken<List<Exercise>>() {}.type
        return gson.fromJson(value, listType)
    }
}

class TrainingResultConverter {
    private val gson = Gson()

    @TypeConverter
    fun fromList(valueList: List<TrainingResult>): String {
        return gson.toJson(valueList)
    }

    @TypeConverter
    fun toList(value: String): List<TrainingResult> {
        val listType = object : TypeToken<List<TrainingResult>>() {}.type
        return gson.fromJson(value, listType)
    }
}

class ExerciseResultConverter {
    private val gson = Gson()

    @TypeConverter
    fun fromList(valueList: List<ExerciseResult>): String {
        return gson.toJson(valueList)
    }

    @TypeConverter
    fun toList(value: String): List<ExerciseResult> {
        val listType = object : TypeToken<List<ExerciseResult>>() {}.type
        return gson.fromJson(value, listType)
    }
}
