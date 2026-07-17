package com.soporte.helpdesk.service;

import com.soporte.helpdesk.entity.Persona;
import com.soporte.helpdesk.repository.PersonaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonaService {

    @Autowired
    private PersonaRepository personaRepository;

    public Persona crearPersona(Persona personaACrear){
        return personaRepository.save(personaACrear);
    }

    public List<Persona> listarPersonas(){
        return  personaRepository.findAll();
    }

}
