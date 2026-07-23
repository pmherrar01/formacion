package com.soporte.helpdesk.service;


import com.soporte.helpdesk.entity.EstadoTicket;
import com.soporte.helpdesk.entity.Persona;
import com.soporte.helpdesk.entity.Ticket;
import com.soporte.helpdesk.entity.TipoPersona;
import com.soporte.helpdesk.repository.PersonaRepository;
import com.soporte.helpdesk.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class TicketService {
    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private PersonaRepository personaRepository;

    public Ticket crearTicket(Ticket ticketACrear){
       ticketACrear.setReportDate(LocalDateTime.now());
       ticketACrear.setEstado(EstadoTicket.ABIERTO);

       Random random = new Random();

       List<Persona> lTecnicos = personaRepository.findAll().stream().filter(per -> per.getTipoPersona() == TipoPersona.TECNICO).toList();

       Persona tecnicoAlAzar =  lTecnicos.get(random.nextInt(lTecnicos.size()));


       if(tecnicoAlAzar != null){
           ticketACrear.setTechnician(tecnicoAlAzar);
           tecnicoAlAzar.setIncidenciasAsignadas(tecnicoAlAzar.getIncidenciasAsignadas() + 1);
           personaRepository.save(tecnicoAlAzar);
       }else {
           ticketACrear.setTechnician(new Persona("fallido", TipoPersona.TECNICO));
       }

       return ticketRepository.save(ticketACrear);
    }

    public List<Ticket> listarTickets(){
        return ticketRepository.findAll();
    }

}
