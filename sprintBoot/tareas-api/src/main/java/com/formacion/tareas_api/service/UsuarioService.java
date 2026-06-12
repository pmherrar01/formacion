package com.formacion.tareas_api.service;

import com.formacion.tareas_api.Usuario;
import com.formacion.tareas_api.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service

public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepo;

    public Usuario crear(Usuario usu) {
        return usuarioRepo.save(usu);
    }
}


