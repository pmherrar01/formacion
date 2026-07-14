package repasoJava;

public class TareaUrgente extends Tarea {

    private int nivelDeUrgencia;

    public TareaUrgente(String titulo , int nivelDeUrgencia, boolean completada) {
        super(titulo, false);

        if(nivelDeUrgencia < 1 || nivelDeUrgencia > 5){
            throw new IllegalArgumentException("EL nivel de urgencia tiene que estar complendido entre el 1 y el 5");
        }

        this.nivelDeUrgencia = nivelDeUrgencia;
    }

    public int getNivelDeUrgencia() {
        return nivelDeUrgencia;
    }
}
