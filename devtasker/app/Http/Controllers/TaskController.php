<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;


class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $todasLasTareas = Task::with("project")->get();

        return response()->json($todasLasTareas);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $datosValidados = $request->validate([
            'title' => "required|string|max:255",
            'description' => "nullable|string",
            'status' => 'nullable|string',
            'project_id' => "required|exists:projects,id"
        ]);

        $tareaCreada = Task::create($datosValidados);
        
        return response()->json($tareaCreada, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $tareaABuscar = Task::with("project")->findOrFail($id);

        return response()->json($tareaABuscar, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $tareaABuscar = Task::findOrFail($id);

       $datosValidados = $request->validate([
            'title' => "required|string|max:255",
            'description' => "nullable|string",
            'status' => 'nullable|string',
            'project_id' => "required|exists:projects,id"
        ]);

        $tareaABuscar -> update($datosValidados);

        return response()->json($tareaABuscar, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $tareaABorrar = Task::findOrFail($id);

        $tareaABorrar -> delete();

        return response()->json(["mensaje" => "La tarea: " . $tareaABorrar->title . " se a borrado perfectamente"], 200);
    }
}
