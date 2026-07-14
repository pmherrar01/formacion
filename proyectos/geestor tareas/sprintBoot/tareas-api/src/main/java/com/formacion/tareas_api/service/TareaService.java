package com.formacion.tareas_api.service;

import com.formacion.tareas_api.Tarea;
import com.formacion.tareas_api.TareaRepository;
import com.formacion.tareas_api.Usuario;
import com.formacion.tareas_api.UsuarioRepository;
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
    @Autowired
    private UsuarioRepository usuarioRepo;


    public List<TareaDTO> listarTodas(){
        return repositorio.findAll().stream().map(tarea -> {

            Long idUsuario = (tarea.getUsuario() != null) ? tarea.getUsuario().getId() : null;

            return  new TareaDTO(tarea.getId(), tarea.getTitulo(), tarea.isCompletada(), idUsuario);
        }).toList();


    }


    public  Tarea crear( TareaDTO datosQueLlegan){
        Tarea nuevaEntidad = new Tarea();
        Usuario usuarioABuscar = usuarioRepo.findById(datosQueLlegan.getIdUsu()).orElseThrow(() -> new RuntimeException("No se a encontrado a ninugn usario con el id" + datosQueLlegan.getIdUsu()));

        nuevaEntidad.setTitulo(datosQueLlegan.getTitulo());
        nuevaEntidad.setCompletada(datosQueLlegan.isCompletada());
        nuevaEntidad.setUsuario(usuarioABuscar);

        return  repositorio.save(nuevaEntidad);
    }


    public Tarea actualizarTarea( Long id,  TareaDTO tareaActualizada){

        Tarea tareaABuscar = repositorio.findById(id).orElseThrow(() -> new RuntimeException("No se encontro la tarea con id: " + id));

        tareaABuscar.setTitulo(tareaActualizada.getTitulo());
        tareaABuscar.setCompletada(tareaActualizada.isCompletada());

        return repositorio.save(tareaABuscar);

    }

    public void borrarTarea( Long id) {

            repositorio.deleteById(id);
    }




    }
