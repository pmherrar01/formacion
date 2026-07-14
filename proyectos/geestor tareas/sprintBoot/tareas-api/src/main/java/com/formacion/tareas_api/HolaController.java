package com.formacion.tareas_api;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

// 1. Le decimos a Spring que esto es un controlador de API
@RestController
public class HolaController {

    // 2. Le decimos qué URL tiene que escuchar
    @GetMapping("/saludo")
    public String decirHola() {
        return "¡Hola mundo! Mi servidor Spring Boot está vivo y coleando.";
    }
}