<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;
use App\Http\Controllers\TaskController;
use App\Models\Task;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $misProjects = Project::with(["tasks", "user"])->where("user_id", $request->user()->id)->get();

        return response()->json($misProjects, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // 1. Validamos que los datos que nos llegan son correctos
        $datosValidados = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        //creacion de proyecto
        $proyectoCreado = Project::create([
            "name" => $datosValidados["name"],
            "description" => $datosValidados["description"],
            "user_id" =>  $request->user()->id
        ]);

        //devolver el poryecto en json
        return response()->json($proyectoCreado, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id, Request $request)
    {
        $proyctoABuscar = Project::with(["tasks", "user"])->findOrFail($id);

        if($proyctoABuscar->user_id !== $request->user()->id){
            return response()->json(["mensaje" => "error, no tienes acceso a este proyecto"], 403);
        }

        return response()->json($proyctoABuscar, 200);
    }

    /**
     * Update the specified resource in storage.
     */

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id, Request $request)
    {
        $proyectoABorrar = Project::findOrFail($id);

        if ($proyectoABorrar->user_id !== $request->user()->id) {
            return response()->json([
                "mensaje" => "Error no tienes acceso este proyecto"
            ], 403);
        }

        $proyectoABorrar->delete();

        return response()->json(["mensaje" => "Proyecto " . $proyectoABorrar->name . " borrado correctamente."], 200);
    }

    public function update(Request $request, string $id)
    {
        // 1. Buscamos el proyecto
        $proyectoAActualizar = Project::findOrFail($id);

        // 2. Validamos los datos nuevos
        $datosValidados = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        // 3. Actualizamos
        if ($proyectoAActualizar->user_id !== $request->user()->id) {
            return response()->json([
                "mensaje" => "Error no tienes acceso este proyecto"
            ], 403);
        }

        $proyectoAActualizar->update([
            "name" => $datosValidados["name"],
            "description" => $datosValidados["description"],
            "user_id" =>  $request->user()->id
        ]);

        // 4. Devolvemos el proyecto actualizado
        return response()->json($proyectoAActualizar, 200);
    }

    public function obtenerTareas(Request $request, string $idProyecto){
      $proyectoABuscar = Project::findOrFail($idProyecto);
      return response()->json($proyectoABuscar->tasks);


    }
}
