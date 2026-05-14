<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;


//ruta proyectos 
Route::get('/proyectos', [ProjectController::class, 'index']);
Route::post('/proyectos', [ProjectController::class, 'store']);
Route::delete("/proyectos/{id}", [ProjectController::class, "destroy"]);
Route::put("/proyectos/{id}", [ProjectController::class, "update"]);
Route::get("/proyectos/{id}", [ProjectController::class, "show"]);


//rutas task
Route::get("/tareas", [TaskController::class, "index"]);
Route::post("/tareas", [TaskController::class , "store"]);
Route::delete("/tareas/{id}", [TaskController::class, "destroy"]);
Route::put("/tareas/{id}", [TaskController::class, "update"]);
Route::get("/tareas/{id}", [TaskController::class, "show"]);
