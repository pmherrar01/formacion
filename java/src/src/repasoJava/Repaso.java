package repasoJava;

public class Repaso {

    // Este es el motor de arranque. Java siempre busca esto para empezar.
    public static void main(String[] args) {
        Tarea nuevaTarea = new Tarea("titulo 1", false);


        System.out.println("El titulko de la tarea es: " + nuevaTarea.getTitulo());
    }
}