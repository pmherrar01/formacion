package com.soporte.helpdesk.config;

import com.soporte.helpdesk.entity.EstadoTicket;
import com.soporte.helpdesk.entity.Persona;
import com.soporte.helpdesk.entity.Ticket;
import com.soporte.helpdesk.entity.TipoPersona;
import com.soporte.helpdesk.repository.PersonaRepository;
import com.soporte.helpdesk.repository.TicketRepository;
import com.soporte.helpdesk.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;


@Component
public class DataSeeder implements CommandLineRunner{

    @Autowired
    private TicketRepository ticketRepository;
    @Autowired
    private PersonaRepository personaRepository;

    @Override
    public void run(String... args) throws Exception {

        Persona tecnico1 = new Persona("Pablo", TipoPersona.TECNICO);
        personaRepository.save(tecnico1);
        Persona funcionario1 = new Persona("marta", TipoPersona.EMPLEADO);
        personaRepository.save(funcionario1);
        Ticket ticket1 = new Ticket("Raton falla", "me a dejado de funcionar esta mañana", funcionario1, EstadoTicket.ABIERTO, tecnico1, LocalDateTime.now());
        ticketRepository.save(ticket1);

    }
}
