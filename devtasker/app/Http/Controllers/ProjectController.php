<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $todosLosProyectos = Project::with(["tasks", "user"])->get();

        return response()->json($todosLosProyectos, 200);
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
            'user_id' => 'required|exists:users,id' // Comprueba que el usuario exista en la tabla users
        ]);

        //creacion de proyecto
        $proyectoCreado = Project::create($datosValidados);

        //devolver el poryecto en json
        return response()->json($proyectoCreado, 201);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $proyctoABuscar = Project::with(["tasks", "user"])->findOrFail($id);

        return response()->json($proyctoABuscar, 200);
    }

    /**
     * Update the specified resource in storage.
     */

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $proyectoABorrar = Project::findOrFail($id);

        $proyectoABorrar -> delete();

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
            'user_id' => 'required|exists:users,id'
        ]);

        // 3. Actualizamos
        $proyectoAActualizar->update($datosValidados);

        // 4. Devolvemos el proyecto actualizado
        return response()->json($proyectoAActualizar, 200);
    }
}
