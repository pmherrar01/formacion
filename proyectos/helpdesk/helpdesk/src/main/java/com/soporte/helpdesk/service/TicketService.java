package com.soporte.helpdesk.service;

import com.soporte.helpdesk.entity.*;
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
        if(ticketACrear.getEstado() == null) ticketACrear.setEstado(EstadoTicket.ABIERTO);
        if(ticketACrear.getPriority() == null) ticketACrear.setPriority(PrioridadTicket.MEDIA);
        if(ticketACrear.getCategory() == null) ticketACrear.setCategory(CategoriaTicket.SOFTWARE);

        List<Persona> lTecnicos = personaRepository.findAll().stream()
                .filter(per -> per.getTipoPersona() == TipoPersona.TECNICO).toList();

        if(!lTecnicos.isEmpty()){
            Random random = new Random();
            Persona tecnicoAlAzar = lTecnicos.get(random.nextInt(lTecnicos.size()));
            ticketACrear.setTechnician(tecnicoAlAzar);
            tecnicoAlAzar.setIncidenciasAsignadas(tecnicoAlAzar.getIncidenciasAsignadas() + 1);
            personaRepository.save(tecnicoAlAzar);
        }

        return ticketRepository.save(ticketACrear);
    }

    public List<Ticket> listarTickets(){
        return ticketRepository.findAll();
    }

    public Ticket obtenerPorId(Long id){
        return ticketRepository.findById(id).orElse(null);
    }

    public Ticket actualizarEstado(Long id, EstadoTicket nuevoEstado) {
        Ticket ticket = obtenerPorId(id);
        if (ticket != null) {
            ticket.setEstado(nuevoEstado);
            if (nuevoEstado == EstadoTicket.RESUELTO || nuevoEstado == EstadoTicket.CERRADO) {
                ticket.setResolutionDate(LocalDateTime.now());
            }
            return ticketRepository.save(ticket);
        }
        return null;
    }
}