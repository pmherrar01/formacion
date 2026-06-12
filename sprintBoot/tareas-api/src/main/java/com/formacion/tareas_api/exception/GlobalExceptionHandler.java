package com.formacion.tareas_api.exception;


import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {


    // Esta anotación le dice a Spring: "Si salta un error de validación, mételo por este tubo"
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Map<String, String> manejarErroresDeValidacion(MethodArgumentNotValidException excepcion) {

        // Creamos un "diccionario" vacío para guardar los errores limpios
        Map<String, String> erroresLimpios = new HashMap<>();


        excepcion.getBindingResult().getFieldErrors().forEach(error -> {

            erroresLimpios.put(error.getField(), error.getDefaultMessage());
        });



        return erroresLimpios;
    }


}
