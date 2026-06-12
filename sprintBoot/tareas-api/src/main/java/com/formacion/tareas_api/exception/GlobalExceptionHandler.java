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


        // TU RETO DE LÓGICA:
        // 1. La 'excepcion' tiene una lista oculta con todos los errores.
        //    Puedes sacarla usando: excepcion.getBindingResult().getFieldErrors()
        // 2. Tienes que recorrer esa lista con un .forEach()
        // 3. Por cada 'error' de esa lista, tienes que extraer dos cosas:
        //    - El nombre del campo que ha fallado: error.getField()
        //    - El mensaje que tú escribiste: error.getDefaultMessage()
        // 4. Mete esos dos datos en tu diccionario usando: erroresLimpios.put(campo, mensaje);

        return erroresLimpios;
    }


}
