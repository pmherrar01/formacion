<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use Illuminate\Testing\Fluent\Concerns\Has;

class AuthController extends Controller
{
    public function register(Request $request){
        $datosValidados = $request->validate([
            "name" => "required|string|max:255",
            "email" => "required|string|email|unique:users",
            "password" => "required|string|min:8"
        ]);

        $user = User::create([
            "name" => $datosValidados["name"],
            "email" => $datosValidados["email"],
            "password" => Hash::make($datosValidados["password"])
            ]);

        $tokenUsu = $user->createToken("tokenAcces")->plainTextToken;

        return response()->json([
            "mensaje" => "Usuario registrado perfectamente",
            "User" => $user,
            "token" => $tokenUsu
        ], 201);

    }

    public function login(Request $request){
        $datosValidados = $request->validate([
            "email" => "required|string|email",
            "password" => "required|string|min:8"
        ]);

        $userEncontrado = User::where("email", $datosValidados["email"])->first();

        if(!$userEncontrado || !Hash::check($datosValidados["password"], $userEncontrado["password"])){
            return response()->json([
                "mensaje" => "Credenciales incorrectas",
            ], 401);

        };

        $nuevoToken = $userEncontrado->createToken("nuevoTokenAcces")->plainTextToken;

        return response()->json([
            "mensaje" => "Login aceptado, bienvenido de nuevo " . $userEncontrado->name . "!",
            "token" => $nuevoToken
        ], 200);
    }
}
