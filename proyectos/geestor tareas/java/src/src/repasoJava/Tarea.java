package repasoJava;

public class Tarea {
    private String titulo;
    private boolean completada;

    // 2. CONSTRUCTOR: La función que se ejecuta al hacer el "new". 
    // Sirve para darle los valores iniciales.
    public Tarea(String titulo, boolean completada) {
        this.titulo = titulo;
        this.completada = completada;
    }

    // 3. GETTERS y SETTERS: Como los atributos son privados, 
    // necesitamos "puertas" públicas para leerlos (get) o cambiarlos (set).
    public String getTitulo() {
        return this.titulo;
    }

    public void setCompletada(boolean completada) {
        this.completada = completada;
    }
    
    public boolean isCompletada() {
        return this.completada; // Para los booleanos, el "get" se suele llamar "is"
    }

}
