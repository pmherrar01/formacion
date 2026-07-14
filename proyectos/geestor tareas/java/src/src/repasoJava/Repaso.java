package repasoJava;

import java.util.Scanner;


public class Repaso {
    final static Scanner teclado = new Scanner(System.in);

    private static String pedirNombre(String mensaje){
        System.out.println(mensaje);
        return teclado.nextLine();

    }

    private  static int pedirNum(String mensaje){
        System.out.println(mensaje);
        return  Integer.parseInt(teclado.nextLine());
    }

    // Este es el motor de arranque. Java siempre busca esto para empezar.
    public static void main(String[] args) {
        GestorTareas gestor = new GestorTareas();

        for (int i = 1; i < 3; i++) {
            gestor.agregarTarea(pedirNombre("Introduce el nombre " + i));
        }

        for (int i = 3; i < 5; i++) {
            gestor.agregarTarea(pedirNombre("Introduce el nombre" + i), pedirNum("Nivel de urgencia:"));
        }

        gestor.mostrarTodas();

        try {
            gestor.marcarComoCompletada(pedirNombre("Introduce el nombre de la tarea que quieres completar"));
            System.out.println("Tarea completada con exito");
        } catch (IllegalArgumentException e) {
            System.err.println(e.getMessage());

        }



        gestor.mostrarPendientes();

    }
}