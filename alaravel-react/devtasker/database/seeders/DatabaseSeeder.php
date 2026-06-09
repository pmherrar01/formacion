<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\Project;
use App\Models\Task;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Definimos tus 3 correos
        $correos = [
            'pabloprueba@gmail.com',
            'pabloprueba2@gmail.com',
            'pabloprueba3@gmail.com'
        ];

        // Recorremos cada correo para hacer la magia
        foreach ($correos as $index => $correo) {
            
            // 2. Creamos al usuario (¡Laravel encripta la contraseña aquí!)
            $user = User::create([
                'name' => 'Pablo Prueba ' . ($index + 1),
                'email' => $correo,
                'password' => Hash::make('pabloprueba' . $index), // <-- ¡CAMBIA ESTA CONTRASEÑA POR LA QUE TÚ QUIERAS!
            ]);

            // 3. Creamos 3 proyectos para este usuario
            for ($p = 1; $p <= 3; $p++) {
                $project = Project::create([
                    'name' => "Proyecto $p de " . $user->name,
                    'description' => "Descripción automática del proyecto $p",
                    'user_id' => $user->id, // Vinculamos el proyecto al usuario
                ]);

                // 4. Creamos 4 tareas para este proyecto
                for ($t = 1; $t <= 4; $t++) {
                    Task::create([
                        'title' => "Tarea $t del Proyecto $p",
                        'description' => "Descripción de la tarea de prueba",
                        'project_id' => $project->id, // Vinculamos la tarea al proyecto
                    ]);
                }
            }
        }
    }
}