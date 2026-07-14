package repasoJava;

import java.util.ArrayList;
import java.util.List;

public class GestorTareas {
    private List<Tarea> listaTareas;


    public GestorTareas() {
        this.listaTareas = new ArrayList<>();
    }

    public void agregarTarea(String titulo) {
        Tarea tarea = new Tarea(titulo, false);
        listaTareas.add(tarea);
    }

    public void agregarTarea(String titulo, int nivelUrgencia) {

        Tarea tareaUrgente = new TareaUrgente(titulo, nivelUrgencia, false);
        listaTareas.add(tareaUrgente);


    }

    public void mostrarTodas() {
        listaTareas.forEach(tarea -> {

            if (tarea instanceof TareaUrgente tu) {
                System.out.println("Tare Urgente!!!  Tarea: " + tu.getTitulo() + ", estado: " + tu.isCompletada() + ". nivel de urgencia: " + tu.getNivelDeUrgencia());

            }else{
                System.out.println("Tarea:" + tarea.getTitulo() + ", estado: " + tarea.isCompletada());
            }



        });
    }

    public void mostrarPendientes() {
        listaTareas.forEach(tarea -> {
            if (!tarea.isCompletada()) {
                System.out.println(tarea.getTitulo());
            }
        });
    }

    private List<Tarea> tareasPorCompletar() {
        List<Tarea> lTareasPorCompletar = new ArrayList<>();

        listaTareas.forEach(tarea -> {
            if (!tarea.isCompletada()) {
                lTareasPorCompletar.add(tarea);
            }
        });
        return lTareasPorCompletar;

    }

    public void marcarComoCompletada(String titulo) {
        boolean[] encontrado = {false};

        tareasPorCompletar().forEach(tarea -> {
            if (tarea.getTitulo().equalsIgnoreCase(titulo)) {
                tarea.setCompletada(true);
                encontrado[0] = true;
            }
        });

        if (!encontrado[0]) {
            throw new IllegalArgumentException("Error, la tarea que buscas no se encuentra en el sistema");
        }

    }


}
