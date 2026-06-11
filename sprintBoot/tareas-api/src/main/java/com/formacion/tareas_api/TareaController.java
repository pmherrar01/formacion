package com.formacion.tareas_api;


import com.formacion.tareas_api.dto.TareaDTO;
import com.formacion.tareas_api.service.TareaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tareas")
public class TareaController {

    @Autowired
    private TareaService servicio;


    @GetMapping
    public List<TareaDTO> get(){
        return servicio.listarTodas();
    }

    @PostMapping
    public Tarea crear(@RequestBody TareaDTO nuevaTarea){
        return servicio.crear(nuevaTarea);
    }

    @PutMapping("/{id}")
    public Tarea actualizarTarea(@PathVariable Long id, @RequestBody TareaDTO tareActualizada){
        return servicio.actualizarTarea(id, tareActualizada);
    }

    @DeleteMapping("/{id}")
    public  String borrarTarea(@PathVariable Long id){
        try {
            servicio.borrarTarea(id);
            return "Tarea con id: " + id + " borrada perfectamente";
        }catch (EmptyResultDataAccessException e){
            return e.getMessage();
        }
    }


}
