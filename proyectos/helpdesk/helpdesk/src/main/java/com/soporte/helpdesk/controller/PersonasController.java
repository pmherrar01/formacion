package com.soporte.helpdesk.controller;

import com.soporte.helpdesk.entity.Persona;
import com.soporte.helpdesk.service.PersonaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("api/personas")
public class PersonasController {

    @Autowired
    private PersonaService personaService;

    @PostMapping
    public Persona crearPersona(@RequestBody Persona nuevaPersona){
        return personaService.crearPersona(nuevaPersona);
    }

    @GetMapping
    public List<Persona> mostrarPersonas(){
        return  personaService.listarPersonas();
    }

}
