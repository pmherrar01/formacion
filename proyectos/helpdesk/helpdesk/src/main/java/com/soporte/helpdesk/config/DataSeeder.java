package com.soporte.helpdesk.config;

import com.soporte.helpdesk.entity.*;
import com.soporte.helpdesk.repository.PersonaRepository;
import com.soporte.helpdesk.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {
    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private PersonaRepository personaRepository;

    @Override
    public void run(String... args) throws Exception {
        Persona t1 = personaRepository.save(new Persona("Pablo Técnico", "pablo@soporte.com", TipoPersona.TECNICO));
        Persona t2 = personaRepository.save(new Persona("Pedro Sistemas", "pedro@soporte.com", TipoPersona.TECNICO));
        Persona t3 = personaRepository.save(new Persona("Juan Redes", "juan@soporte.com", TipoPersona.TECNICO));
        Persona t4 = personaRepository.save(new Persona("Manu Hardware", "manu@soporte.com", TipoPersona.TECNICO));

        Persona e1 = personaRepository.save(new Persona("Marta Contabilidad", "marta@empresa.com", TipoPersona.EMPLEADO));
        Persona e2 = personaRepository.save(new Persona("Alma RRHH", "alma@empresa.com", TipoPersona.EMPLEADO));
        Persona e3 = personaRepository.save(new Persona("Carla Dirección", "carla@empresa.com", TipoPersona.EMPLEADO));
        Persona e4 = personaRepository.save(new Persona("Roberto Ventas", "roberto@empresa.com", TipoPersona.EMPLEADO));

        crearYGuardarTicket("Ratón no responde", "El puntero se congela constantemente", e1, EstadoTicket.ABIERTO, PrioridadTicket.BAJA, CategoriaTicket.HARDWARE, t1);
        crearYGuardarTicket("No puedo entrar al correo", "Da error de contraseña expirada", e2, EstadoTicket.EN_PROGRESO, PrioridadTicket.ALTA, CategoriaTicket.ACCESOS, t2);
        crearYGuardarTicket("Impresora sin tóner", "La impresora de la 2ª planta parpadea en rojo", e3, EstadoTicket.ABIERTO, PrioridadTicket.MEDIA, CategoriaTicket.HARDWARE, t3);
        crearYGuardarTicket("VPN muy lenta", "Tarda 5 minutos en abrir los archivos compartidos", e4, EstadoTicket.EN_PROGRESO, PrioridadTicket.URGENTE, CategoriaTicket.REDES, t4);
        crearYGuardarTicket("Excel se cierra solo", "Al intentar exportar a PDF se rompe la aplicación", e1, EstadoTicket.RESUELTO, PrioridadTicket.MEDIA, CategoriaTicket.SOFTWARE, t1);
        crearYGuardarTicket("Solicitud segundo monitor", "Para mejorar productividad en contabilidad", e1, EstadoTicket.ABIERTO, PrioridadTicket.BAJA, CategoriaTicket.HARDWARE, t2);
        crearYGuardarTicket("Wi-Fi se desconecta", "En la sala de reuniones se pierde la señal", e3, EstadoTicket.EN_PROGRESO, PrioridadTicket.ALTA, CategoriaTicket.REDES, t3);
        crearYGuardarTicket("Permisos para carpeta compartida", "Necesito acceso a /Proyectos/2026", e4, EstadoTicket.RESUELTO, PrioridadTicket.MEDIA, CategoriaTicket.ACCESOS, t4);
        crearYGuardarTicket("Pantalla azul en PC", "El ordenador se reinició solo y no arranca", e2, EstadoTicket.ABIERTO, PrioridadTicket.URGENTE, CategoriaTicket.HARDWARE, t1);
        crearYGuardarTicket("Instalar Photoshop", "Licencia aprobada por dirección", e3, EstadoTicket.CERRADO, PrioridadTicket.BAJA, CategoriaTicket.SOFTWARE, t2);
    }

    private void crearYGuardarTicket(String t, String d, Persona aff, EstadoTicket est, PrioridadTicket pri, CategoriaTicket cat, Persona tec) {
        Ticket ticket = new Ticket(t, d, aff, est, pri, cat, tec);
        ticketRepository.save(ticket);
        tec.setIncidenciasAsignadas(tec.getIncidenciasAsignadas() + 1);
        personaRepository.save(tec);
    }
}