package com.formacion.tareas_api;

import jakarta.persistence.*;

// @Entity le dice a Spring: "¡Crea una tabla para esto en Supabase!"
@Entity
public class Tarea {

    // @Id le dice que esta es la Clave Primaria (Primary Key)
    // @GeneratedValue le dice que es autoincremental (1, 2, 3...)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titulo;
    private boolean completada;


    @ManyToOne
    @JoinColumn(name = "usuario_id")
    private Usuario usuario;

    public String getContraseñaTarea() {
        return contraseñaTarea;
    }

    public void setContraseñaTarea(String contraseñaTarea) {
        this.contraseñaTarea = contraseñaTarea;
    }

    private String contraseñaTarea;

    public Tarea() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public boolean isCompletada() {
        return completada;
    }

    public void setCompletada(boolean completada) {
        this.completada = completada;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }


}