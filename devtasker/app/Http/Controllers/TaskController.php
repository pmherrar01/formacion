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
    public function index(Request $request)
    {
        $todasLasTareas = Task::with("project")->whereHas("project", function ($query) use ($request) {
            $query->where("user_id", $request->user()->id);
        })->get();

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

        $project = Project::findOrFail($datosValidados["project_id"]);

        if ($project->user_id !== $request->user()->id) {
            return response()->json([
                "mensaje" => "Error no tienes acceso a este proyecto"
            ], 403);
        }

        $tareaCreada = Task::create($datosValidados);

        return response()->json($tareaCreada, 201);
    }


    public function show(string $id, Request $request)
    {
        $tareaABuscar = Task::with("project")->findOrFail($id);

        if($tareaABuscar->project->user_id !== $request->user()->id){
        return response()->json(["mensaje" => "Error no tienes acceso a ese projecto"], 403);
        }

        return response()->json($tareaABuscar, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $tareaABuscar = Task::findOrFail($id);

        $project = $tareaABuscar->project;

        if ($project->user_id !== $request->user()->id) {
            return response()->json([
                "mesaje" => "Error no tienes acceso a este proyecto"
            ], 403);
        }


        $datosValidados = $request->validate([
            'title' => "required|string|max:255",
            'description' => "nullable|string",
            'status' => 'nullable|string',
            'project_id' => "required|exists:projects,id"
        ]);

        if ($request->project_id != $tareaABuscar->project_id) {
            $nuevoProyecto = Project::findOrFail($request->project_id);

            if ($nuevoProyecto->user_id !== $request->user()->id) {
                return response()->json([
                    "mensaje" => "Error, no puedes mover la tarea a un proyecto que no es tuyo"
                ], 403);
            }
        }

        $tareaABuscar->update($datosValidados);

        return response()->json($tareaABuscar, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id, Request $request)
    {
        $tareaABorrar = Task::findOrFail($id);

        $project = $tareaABorrar->project;

        if ($project->user_id !== $request->user()->id) {
            return response()->json([
                "mensaje" => "error no tienes acceso al proyecto"
            ],  403);
        }

        $tareaABorrar->delete();

        return response()->json([
            "mensaje" => "La tarea: " . $tareaABorrar->title . " se ha borrado perfectamente"
        ], 200);
    }
}
