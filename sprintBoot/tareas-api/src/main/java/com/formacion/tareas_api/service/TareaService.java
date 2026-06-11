package com.formacion.tareas_api.service;

import com.formacion.tareas_api.Tarea;
import com.formacion.tareas_api.TareaRepository;
import com.formacion.tareas_api.dto.TareaDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Service

public class TareaService {

    @Autowired
    private TareaRepository repositorio;


    public List<TareaDTO> listarTodas(){
        return repositorio.findAll().stream().map(tarea -> new TareaDTO(tarea.getId(), tarea.getTitulo(), tarea.isCompletada())).toList();
    }


    public  Tarea crear( TareaDTO nuevaTarea){
        Tarea nuevaEntidad = new Tarea();

        nuevaEntidad.setTitulo(nuevaTarea.getTitulo());
        nuevaEntidad.setCompletada(nuevaTarea.isCompletada());

        return  repositorio.save(nuevaEntidad);
    }


    public Tarea actualizarTarea( Long id,  TareaDTO tareaActualizada){


        return  repositorio.findById(id)

    }

    public void borrarTarea( Long id) {

            repositorio.deleteById(id);
    }




    }
