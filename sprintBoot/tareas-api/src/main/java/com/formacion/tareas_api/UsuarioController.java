package com.formacion.tareas_api;

import com.formacion.tareas_api.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioService serviceUsu;

    @PostMapping
    public Usuario crear(@RequestBody Usuario nuevoUsu){
        return serviceUsu.crear(nuevoUsu);
    }


}
